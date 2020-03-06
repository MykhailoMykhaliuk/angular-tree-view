import { Injectable } from '@angular/core';
import { ITreeNode } from '../../interfaces';
import { TreeNodeService } from '../tree-node/tree-node.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  constructor(private treeNodeService: TreeNodeService) { }

  getDefaultTree(): ITreeNode {
    return this.treeNodeService.createNode('Root', 5, { min: 20, max: 100 });
  }

  getNewStateWithUpdatedNode(treeNode: ITreeNode, updatedNode: ITreeNode): ITreeNode {
    if (treeNode.id === updatedNode.id) {
      return updatedNode;
    }

    return {
      ...treeNode,
      children: treeNode.children.map(node => this.getNewStateWithUpdatedNode(node, updatedNode))
    };
  }

  getStateWithNewNode(treeNode: ITreeNode, pointerNode: ITreeNode, nodeToAdd: ITreeNode): ITreeNode {
    if (treeNode.id === pointerNode.id) {
      return {
        ...treeNode,
        children: [nodeToAdd]
      };
    }

    return {
      ...treeNode,
      children: treeNode.children.map(node => this.getStateWithNewNode(node, pointerNode, nodeToAdd))
    };
  }

  getStateWithoutNode(treeNode: ITreeNode, nodeToDelete: ITreeNode): ITreeNode {
    if (treeNode.id ===  nodeToDelete.id) {
      return null;
    }

    if (this.contains(treeNode.children, nodeToDelete)) {
      return {
        ...treeNode,
        children: treeNode.children.filter(({ id }) => id !== nodeToDelete.id)
      }
    };

    return {
      ...treeNode,
      children: treeNode.children.map(node => this.getStateWithoutNode(node, nodeToDelete))
    };
  }

  contains(nodes: ITreeNode[], node: ITreeNode): boolean {
    return Boolean(nodes.find(({ id }) => id === node.id));
  }
}
