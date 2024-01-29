import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Proveedores from './pages/Proveedores'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="proveedores" element={<Proveedores />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
