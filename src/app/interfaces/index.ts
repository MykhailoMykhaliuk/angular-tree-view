export interface ITreeNode {
  data: ITreeData;
  id?: number;
  expanded: boolean;
  children: ITreeNode[];
}

export interface ITreeData extends IBoundaries {
  name: string | number;
}

export interface IBoundaries {
  min: number;
  max: number;
}