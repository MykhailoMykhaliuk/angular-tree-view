import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { ITreeNode } from '../../interfaces';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {
  @Input() treeNode: ITreeNode;
  @Output() onUpdate: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();

  constructor(private contextMenuService: ContextMenuService) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(): void {
    this.closeMenu();
  }

  openMenu(event: MouseEvent, treeNode: ITreeNode): void {
    this.contextMenuService.open(event, treeNode);
  }

  closeMenu(): void {
    this.contextMenuService.close();
  }

  toggle(): void {
    this.treeNode.expanded = !this.treeNode.expanded;
  }
}
