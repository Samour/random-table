import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainView from './views/MainView';
import NewTableView from './views/NewTableView';
import { store } from './store';
import { startDataSync } from './services/dataPersistanceService';
import TableView from './views/TableView';
import EditTableView from './views/EditTableView';

startDataSync(store);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/new-table" element={<NewTableView />} />
          <Route path="/table/:tableId" element={<TableView />} />
          <Route path="/table/:tableId/edit" element={<EditTableView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
