import React, { useState, useContext, useEffect } from 'react';
import '../assets/css/RegisterPage.css';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [mensajeError, setMensajeError] = useState(null);
    const { login, email, setEmail, password, setPassword, token } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            alert
            return;
        }

        setMensajeError(null);
        await login()

        if (localStorage.getItem('token')) {
            navigate('/profile'); // Explicitly navigate to the profile page
        }
        
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        if (token) {
            navigate('/profile'); // Redirect to the profile page
        }
    }, [token, navigate]);

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                {mensajeError ? <p>{mensajeError}</p> : null}

                <h2>Formulario de Registro</h2>

                <div>
                    <h4>Email</h4>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <h4>Contraseña</h4>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default LoginPage;