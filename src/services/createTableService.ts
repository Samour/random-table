import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Mutation } from 'src/store/mutations/Mutation';
import { addTableMutation } from 'src/store/mutations/tables/AddTableMutation';

interface TableItemSpec {
  id: string;
  name: string;
  weight: number;
}

export interface CreateTableSpec {
  id: string;
  name: string;
  items: TableItemSpec[];
}

export interface CreateTableService {
  createTable(table: CreateTableSpec): void
}

class CreateTableServiceImpl implements CreateTableService {

  constructor(private readonly dispatch: Dispatch<Mutation>, private readonly navigate: NavigateFunction) { }

  createTable(table: CreateTableSpec): void {
    this.dispatch(addTableMutation({
      ...table,
      size: 20,
    }));
    this.navigate("/");
  }
}

export const useCreateTableService = (): CreateTableService => new CreateTableServiceImpl(
  useDispatch(),
  useNavigate(),
);
