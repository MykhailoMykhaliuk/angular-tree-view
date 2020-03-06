import { Injectable } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { map, tap } from 'rxjs/operators';
import { ContextMenuComponent } from '../../components/context-menu/context-menu.component';
import { ITreeNode } from '../../interfaces';
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

    this.compRef.instance.onEdit
      .pipe(
        map(updatedNode => {
          return this.treeService.getNewStateWithUpdatedNode(this.dataFlowService.getCurrentState(), updatedNode);
        }),
        tap(this.close.bind(this))
      )
      .subscribe(this.emitNewState.bind(this));

    this.compRef.instance.onAdd
      .pipe(
        map(( { pointerNode, newNode } ) => {
          return this.treeService.getStateWithNewNode(this.dataFlowService.getCurrentState(), pointerNode, newNode);
        }),
        tap(this.close.bind(this))
      )
      .subscribe(this.emitNewState.bind(this));

    this.compRef.instance.onDelete
      .pipe(
        map(updatedNode => {
          return this.treeService.getStateWithoutNode(this.dataFlowService.getCurrentState(), updatedNode);
        }),
        tap(this.close.bind(this))
      )
      .subscribe(this.emitNewState.bind(this));
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

  private emitNewState(updatedState: ITreeNode): void {
    this.dataFlowService.emitNewState(updatedState);
  }
}
