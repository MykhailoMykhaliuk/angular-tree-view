import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service'
import { ITreeNode, IBoundaries } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {
  constructor(private utilsService: UtilsService) { }

  getEditedNode(treeNode: ITreeNode, name: string, childCount: number, { min, max }: IBoundaries): ITreeNode {
    return {
      ...treeNode,
      data: {
        name: name ? name : treeNode.data.name,
        min,
        max
      },
      children: this.generateChildren(childCount, min, max)
    };
  }

  createNode(name: string, childCount: number, { min, max }: IBoundaries): ITreeNode {
    return {
      data: {
        name,
        min,
        max
      },
      id: this.utilsService.getUniqueId(),
      expanded: true,
      children: this.generateChildren(childCount, min, max)
    }
  }

  generateChildren(childCount: number, min: number, max: number): ITreeNode[] {
    return this.utilsService.convertNumberToArray(childCount)
      .map(() => ({
        data: {
          name: this.utilsService.generateRandomInteger(min, max),
          min,
          max
        },
        id: this.utilsService.getUniqueId(),
        expanded: true,
        children: []
      }));
  }
}
