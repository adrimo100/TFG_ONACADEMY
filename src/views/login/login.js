import React, {useContext, useState} from "react";
import {Context} from "../../store/context";

const Login = () => {
    const { store, actions } = useContext(Context);

    const [userCredentials, setUserCredentials] = useState({});
    const [error, setError] = useState('');

    const updateUserCredentials = (event) => {
        const target = event.target;
        setUserCredentials({ ...userCredentials, [target.name]: target.value });
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const submit = (event) => {
        event.preventDefault();
        setError('');

        if (!validateEmail(userCredentials.email) || userCredentials.email?.length > 65) {
            setError('Introduce un correo electrónico válido con máximo 65 caracteres.');
            return;
        }

        if (!userCredentials.password || userCredentials.password?.length > 20) {
            setError('Introduce una contraseña válida con máximo 20 caracteres.');
            return;
        }

        actions.loginUser(userCredentials);
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <form className="mt-5 w-50 bg-dark p-2 text-white rounded">
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Correo Electrónico</label>
                    <input name="email" type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" onChange={updateUserCredentials}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Contraseña</label>
                    <input name="password" type="password" className="form-control" id="inputPassword1" onChange={updateUserCredentials}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={submit}>Iniciar sesión</button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    )
}

export default Login;
