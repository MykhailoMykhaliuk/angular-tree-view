import { Injectable, EventEmitter } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { map, tap } from 'rxjs/operators';
import { ContextMenuComponent } from '../../components/context-menu/context-menu.component';
import { ITreeNode, IAddTreeNode } from '../../interfaces';
import { TreeService} from '../tree/tree.service';
import { DataFlowService } from '../data-flow/data-flow.service';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  overlayRef: OverlayRef;
  compRef: ComponentRef<ContextMenuComponent>;

  constructor(
    private treeService: TreeService,
    private dataFlowService: DataFlowService,
    private overlay: Overlay
  ) {}

  open(event: MouseEvent, treeNode: ITreeNode): void {
    event.preventDefault();
    event.stopPropagation();

    this.overlayRef = this.overlay.create(this.getOverlayConfig(event));
    this.compRef = this.overlayRef.attach(new ComponentPortal(ContextMenuComponent));

    this.compRef.instance.treeNode = treeNode;

    this.observeChanges(this.compRef.instance.onEdit, this.editTreeNodeMapper.bind(this));
    this.observeChanges(this.compRef.instance.onAdd, this.addTreeNodeMapper.bind(this));
    this.observeChanges(this.compRef.instance.onDelete, this.deleteTreeNodeMapper.bind(this));
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.compRef = null;
  }

  private getOverlayConfig({ x, y }: MouseEvent): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);

    return new OverlayConfig({ positionStrategy });
  }

  private observeChanges(source$: EventEmitter<any>, handler: Function): void {
    source$
      .pipe(
        map(handler.bind(this)),
        tap(this.close.bind(this))
      )
      .subscribe(this.emitNewState.bind(this));
  }

  private editTreeNodeMapper(updatedNode: ITreeNode): ITreeNode {
    return this.treeService.getNewStateWithUpdatedNode(this.dataFlowService.getCurrentState(), updatedNode);
  }

  private addTreeNodeMapper({ pointerNode, newNode }: IAddTreeNode): ITreeNode {
    return this.treeService.getStateWithNewNode(this.dataFlowService.getCurrentState(), pointerNode, newNode);
  }

  private deleteTreeNodeMapper(nodeToDelete: ITreeNode): ITreeNode {
    return this.treeService.getStateWithoutNode(this.dataFlowService.getCurrentState(), nodeToDelete);
  }

  private emitNewState(updatedState: ITreeNode): void {
    this.dataFlowService.emitNewState(updatedState);
  }
}
