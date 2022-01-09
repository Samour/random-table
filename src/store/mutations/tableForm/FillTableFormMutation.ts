import { ConstructedTableItem } from 'src/model/ConstructedTable';
import { RandomTable } from 'src/model/RandomTable';
import { constructTableItems } from 'src/services/model/tableConstructionService';
import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface FillTableFormMutation extends Mutation {
  type: MutationType.FILL_TABLE_FORM;
  table: RandomTable;
  items: ConstructedTableItem[];
}

export const fillTableFormMutation = (table: RandomTable): FillTableFormMutation => ({
  type: MutationType.FILL_TABLE_FORM,
  table,
  items: constructTableItems(table),
});
