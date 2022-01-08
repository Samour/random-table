export interface RandomTableItem {
  id: string;
  name: string;
  weight: number;
}

export interface RandomTable {
  id: string;
  name: string;
  size: number;
  items: RandomTableItem[];
}
