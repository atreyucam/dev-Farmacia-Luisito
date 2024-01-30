// import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
/* importaciones  */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina_General from "./pages/Pagina_General";
import Registro from "./pages/Registro";
import Dashboard from "./Componentes/Dashboard";
import Cliente1 from "./pages/Cliente1";
import ProductosGeneral from "./pages/ProductosGenerales";
// import BajoReceta from "./Paginas/BajoReceta";
import Ventas from "./Componentes/Ventas";

/* Nueva version  version 3*/ 
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagina_General />} />
          <Route path="/registro" element={<Registro />} />
          {/* <Route path="/regreso" element={<Pagina_General />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cliente1" element={<Cliente1 />} />
          <Route path="/produGenerales" element={<ProductosGeneral />} />
          {/* <Route path="bajoReceta" element={<BajoReceta />} /> */}
          <Route path="/Ventas" element={<Ventas/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
