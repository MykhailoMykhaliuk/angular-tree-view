import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITreeNode } from '../../interfaces';
import { TreeService } from '../tree/tree.service';

@Injectable({
  providedIn: 'root'
})
export class DataFlowService {
  public treeData$ = new BehaviorSubject<ITreeNode>(this.treeService.getDefaultTree());

  constructor(private treeService: TreeService) { }

  getCurrentState(): ITreeNode {
    return this.treeData$.getValue();
  }

  emitNewState(treeData: ITreeNode): void {
    this.treeData$.next(treeData);
  }
}
