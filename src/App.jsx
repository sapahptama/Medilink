import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecuperarContrasena from './components/RecuperarContrasena/RecuperarContrasena.jsx';
import Citas from "./components/citas/citas.jsx";
import Login from "./components/login/login.jsx";
import Inicio from "./components/Inicio/Inicio.jsx";  
import Splash from "./components/Splash/Splash.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/Recuperar" element={<RecuperarContrasena />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
