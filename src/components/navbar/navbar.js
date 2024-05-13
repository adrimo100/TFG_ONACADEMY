import React from "react";
import {useNavigate} from "react-router";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar bg-dark bg-body-tertiary" data-bs-theme="dark">
            <header className="navbar-brand d-flex w-100">
                <div className="container-fluid">
                    <button className="btn btn-warning me-2" type="button"><span className="fw-bold" onClick={() => navigate("/")}>HOME</span></button>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary me-2" type="button"  onClick={() => navigate("/register")}>Crear cuenta</button>
                    <button className="btn btn-sm btn-outline-secondary text-white" type="button" onClick={() => navigate("/login")}>Iniciar Sesión</button>
                </div>
            </header>
        </nav>
    )
}

export default Navbar;
