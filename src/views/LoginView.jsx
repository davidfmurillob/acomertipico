import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const LoginView = () => {

    const navigate = useNavigate();
    
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value})
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
             axios.post(`api/auth/login`, data).then(res => {
            // axios.post(`api/auth/login`, data).then(res => {
                console.log(res)
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Inicio de sesión exitoso",res.data.message,"success");
                    if(res.data.rol_id === 1)
                    {
                        navigate('/admin/dashboard');
                    }
                    else
                    {
                        navigate('/');
                    }
                }
                else if(res.data.status === 401)
                {
                    swal("Warning",res.data.message,"warning");
                }
                else
                {
                    setLogin({...loginInput, error_list: res.data.validation_errors });
                }
            });
        });

    }















  return (

<div className="bg-zinc-400 h-[92vh] flex flex-col">
            <div className="container h-fit max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form className="bg-white px-6 py-6 rounded shadow-md text-black w-full" onSubmit={loginSubmit}>
                    <h1 className="mb-8 text-3xl text-center">Inicio de sesión</h1>
                    
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" 
                        onChange={handleInput}
                        />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        onChange={handleInput}
                        />

                    <p className='text-sm pl-1 w-fit mb-2 border-b border-slate-300 hover:border-neutral-900'>
                    <Link className="text-black hover:border-orange-400" to="/nosotros">
                        No recuerdo mi contraseña
                    </Link>

                    </p>

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-orange-400 hover:bg-orange-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Iniciar sesión</button>

                    
                </form>

                <div className="text-grey-dark mt-6 flex gap-2 text-lg">
                    <p>
                    No tienes una cuenta? 
                    </p>
                    <Link className="border-b-2  border-orange-400 text-black hover:border-orange-200" to="/registro">
                        Registrate
                    </Link>
                </div>
            </div>
        </div>


  )
}

export default LoginView