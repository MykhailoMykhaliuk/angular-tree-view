import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlNames } from '../../enums';
import { ITreeNode, IBoundaries } from '../../interfaces';
import { TreeNodeService } from '../../services/tree-node/tree-node.service';

export interface IAddTreeNode {
  pointerNode: ITreeNode;
  newNode: ITreeNode;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input() treeNode: ITreeNode;
  @Output() onEdit: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();
  @Output() onAdd: EventEmitter<IAddTreeNode> = new EventEmitter<IAddTreeNode>();
  @Output() onDelete: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();

  treeNodeForm = new FormGroup({
    [ControlNames.Name]: new FormControl(''),
    [ControlNames.ItemCount]: new FormControl('', [
      Validators.pattern(/^(0|\-?[1-9][0-9]*)$/),
      Validators.min(1),
      Validators.max(15)
    ]),
    [ControlNames.LowerBound]: new FormControl('', [Validators.pattern(/^(0|\-?[1-9][0-9]*)$/)]),
    [ControlNames.UpperBound]: new FormControl('', [Validators.pattern(/^(0|\-?[1-9][0-9]*)$/)])
  });

  constructor(private treeNodeService: TreeNodeService) { }

  rename() {
    this.onEdit.emit({
      ...this.treeNode,
      data: {
        ...this.treeNode.data,
        name: this.getControlValue(ControlNames.Name)
      }
    });
  }

  generate(): void {
    const name = this.getControlValue(ControlNames.Name);
    const count = this.getControlValue(ControlNames.ItemCount);
    const boundaries = this.getBoundaries();

    this.onEdit.emit(this.treeNodeService.getEditedNode(this.treeNode, name, count, boundaries));
  }

  add(): void {
    const name = this.getControlValue(ControlNames.Name);
    const count = this.getControlValue(ControlNames.ItemCount);
    const boundaries = this.getBoundaries();
    
    this.onAdd.emit({
      pointerNode: this.treeNode,
      newNode: this.treeNodeService.createNode(name, count, boundaries)
    });
  }

  delete(): void {
    this.onDelete.emit(this.treeNode);
  }

  private getBoundaries(): IBoundaries {
    return {
      min: this.getControlValue(ControlNames.LowerBound),
      max: this.getControlValue(ControlNames.UpperBound)
    };
  }

  private getControlValue(controlName: string) {
    const control = this.treeNodeForm.get(controlName);
    return control ? control.value : 0;
  }
}
