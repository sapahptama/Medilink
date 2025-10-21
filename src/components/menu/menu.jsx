import { useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaBell, FaUser } from "react-icons/fa";


export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      {/* Menú inferior */}
      <nav className="menu-bottom">
        <button onClick={() => navigate("/inicio")}><FaHome /></button>
        <button onClick={() => navigate("/citas-del-usuario")}><FaCalendarAlt /></button>
        <button onClick={() => navigate("/notificaciones")}><FaBell /></button>
        <button onClick={() => navigate("/perfil")}><FaUser /></button>
      </nav>
    </div>
  );
}
