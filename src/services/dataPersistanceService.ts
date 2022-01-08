import { Store } from 'redux';
import { AppState } from 'src/store/model';
import { RandomTable } from 'src/model/RandomTable';
import { initialiseTablesMutation } from 'src/store/mutations/tables/InitialiseTablesMutation';

const CURRENT_SCHEMA_VERSION = 1;

interface StorageWrapper<T> {
  schemaVersion: number;
  data: T;
}

const LOCAL_STORAGE_KEY = "random-table/tables";

class DataPersistanceService {

  private storedData: RandomTable[] | null = null;

  constructor(private readonly store: Store<AppState>) { }

  initialiseStore() {
    const persisted = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!!persisted) {
      const stored: StorageWrapper<RandomTable[]> = JSON.parse(persisted);
      this.storedData = stored.data;
      this.store.dispatch(initialiseTablesMutation(stored.data));
    }
  }

  subscribe() {
    this.store.subscribe(() => {
      if (this.store.getState().tables !== this.storedData) {
        this.storedData = this.store.getState().tables;
        const stored: StorageWrapper<RandomTable[]> = {
          schemaVersion: CURRENT_SCHEMA_VERSION,
          data: this.storedData,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
      }
    });
  }
}

export const startDataSync = (store: Store<AppState>) => {
  const dataPersistanceService = new DataPersistanceService(store);
  dataPersistanceService.initialiseStore();
  dataPersistanceService.subscribe();
};
