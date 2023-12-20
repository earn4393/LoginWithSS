import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardAdmin from './page/DashboardAdmin';
import DashboardUser from './page/DashboardUser';
import Preferences from './page/Preferences';
import Login from './page/Login';
import Home from './page/Home';
import MenuBer from './components/MenuBer';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuBer />}>
          <Route index element={<Home />} />
          <Route path="dash-a" element={<RequireAuth><DashboardAdmin /></RequireAuth>} />
          <Route path="dash-u" element={<DashboardUser />} />
          <Route path="prefer" element={<RequireAuth><Preferences /></RequireAuth>} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;