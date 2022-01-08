import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainView from './views/MainView';
import NewTableView from './views/NewTableView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/new-table" element={<NewTableView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
