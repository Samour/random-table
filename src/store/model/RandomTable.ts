export interface RandomTableItem {
  id: string;
  name: string;
  rangeLow: number;
  rangeHigh: number;
}

export interface RandomTable {
  id: string;
  name: string;
  size: number;
  items: RandomTableItem[];
}
