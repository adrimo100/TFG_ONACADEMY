import React, {useContext, useState} from "react";
import {Context} from "../../store/context";

const Register = () => {
    const { store, actions } = useContext(Context);

    const [newUser, setNewUser] = useState({});
    const [error, setError] = useState('');

    const updateUser = (event) => {
        const target = event.target;
        setNewUser({ ...newUser, [target.name]: target.value });
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const submit = (event) => {
        event.preventDefault();
        setError('');

        if (newUser.name.length > 65) {
            setError('El nombre debe tener máximo 65 caracteres.');
            return;
        }

        if (!validateEmail(newUser.email) || newUser.email.length > 65) {
            setError('Introduce un correo electrónico válido con máximo 65 caracteres.');
            return;
        }

        if (newUser.password.length > 20) {
            setError('La contraseña debe tener máximo 20 caracteres.');
            return;
        }

        actions.createUser(newUser);
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <form className="mt-5 w-50 bg-dark p-2 text-white rounded">
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Nombre</label>
                    <input name="name" type="text" className="form-control" id="inputName" aria-describedby="nameHelp" onChange={updateUser} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Correo Electrónico</label>
                    <input name="email" type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" onChange={updateUser}/>
                    <div id="emailHelp" className="form-text text-secondary">Nunca compartiremos tu email con nadie.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Contraseña</label>
                    <input name="password" type="password" className="form-control" id="inputPassword1" onChange={updateUser}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={submit}>Regístrarse</button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    )
}

export default Register;
