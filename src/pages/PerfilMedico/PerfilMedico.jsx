// UserProfile.jsx
import React from "react";
import "./PerfilMedico.css";

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="Foto de perfil"
          className="profile-img"
        />
        <h2 className="profile-name">Laura Martínez</h2>
        <p className="profile-info"><strong>Edad:</strong> 30 años</p>
        <p className="profile-info"><strong>Correo:</strong> laura.martinez@example.com</p>
        <p className="profile-info"><strong>Teléfono:</strong> +57 312 456 7890</p>
        <p className="profile-info"><strong>Dirección:</strong> Carrera 15 #23-45, Bogota</p>
      </div>
    </div>
  );
};

export default UserProfile;