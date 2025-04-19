import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({})
    const [token, setToken] = useState(localStorage.getItem("token"))

    const login = async(e) => {
        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', data.email)
                setToken(data.token)
                alert('Login exitoso')
            }
            else {
                alert('Credenciales incorrectas')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const register = async(e) => {
        try {
            const response = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', data.email)
                alert('Registro exitoso')
            }
            else {
                alert('Error al registrar: ' + data.error)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        setUser({})
        setToken(null)
    }

    const getUser = async(e) => {
        const token = localStorage.getItem("token");

        if (token) {
        try {
          const response = await fetch("http://localhost:5001/api/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if(response.ok) {
            const data = await response.json();
            setUser(data);
          }
          else {
            alert("No autorizado");
          }

        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }

    }

    return (
        <UserContext.Provider value={{login, register, logout, getUser, email, setEmail, password, setPassword, user, token}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;