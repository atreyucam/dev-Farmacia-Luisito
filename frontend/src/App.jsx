// import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
/* importaciones  */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagina_General from "./Paginas/Pagina_General";
import Registro from "./Paginas/Registro";
import Dashboard from "./Componentes/Dashboard";
import Cliente1 from "./Paginas/Cliente1";
import ProductosGeneral from "./Paginas/ProductosGenerales";
// import BajoReceta from "./Paginas/BajoReceta";
import Ventas from "./Componentes/Ventas";
import Alertas from "./Paginas/Alertas";
// import Alertas from "./Paginas/Alertas";

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
          {/* <Route path="/Alertas" element={<Alertas/>}></Route> */}
          <Route path="alertas" element={<Alertas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
