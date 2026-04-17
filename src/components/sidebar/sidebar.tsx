import './sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
return (
<>
    <div className="main-sd-container"> 
        <div className='app-name'>
            <h1>Stock Manager API</h1>
        </div>
        <div className="actions-container">
            <Link to="/"><i className="fa-solid fa-chart-line"></i>Inicio</Link>
            <Link to="/orders"><i className="fa-solid fa-cart-arrow-down"></i>Pedidos</Link>
            <Link to="/products"><i className="fa-solid fa-cube"></i>Productos</Link>
            <Link to="/categories"><i className="fa-solid fa-table-cells-large"></i>Categorías</Link>
            <Link to="/providers"><i className="fa-solid fa-hand-holding-hand"></i>Proveedores</Link>
            <Link to="/settings"><i className="fa-solid fa-gear"></i>Configuración</Link>
            <Link to="/account"><i className="fa-solid fa-circle-user"></i>Cuenta</Link>
            <Link to="/login"><i className="fa-solid fa-right-from-bracket"></i>Salir</Link>
        </div>
    </div>
</>
)
}

export default Sidebar;