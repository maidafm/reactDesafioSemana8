import React, { useState, useContext } from 'react';
import '../assets/css/RegisterPage.css';
import { UserContext } from '../context/UserContext';

const RegisterPage = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mensajeError, setMensajeError] = useState(null);
    const { register, email, setEmail, password, setPassword } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '' || confirmPassword === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            alert
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        setMensajeError(null);
        register();
        
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

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
                <div>
                    <h4>Confirmar Contraseña</h4>
                    <input
                        type="password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default RegisterPage;