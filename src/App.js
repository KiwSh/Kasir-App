import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarComponents from './components/NavbarComponents'; // Pastikan ini juga diimpor dengan benar
import Home from './pages/Home';
import Sukses from './pages/Sukses';
import Login from './pages/Login';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponents />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sukses" element={<Sukses />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
