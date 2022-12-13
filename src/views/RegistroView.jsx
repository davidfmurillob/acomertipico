import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'

const RegistroView = () => {

    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

            axios.post(`api/auth/register`, data).then(res => { 
            // axios.post(`api/register`, data).then(res => { 
                if(res.data.status === 200)
                {
                    // localStorage.setItem('auth_token', res.data.token);
                    // localStorage.setItem('auth_name', res.data.username);
                    swal("Success",res.data.message,"success");
                    navigate('/login')
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            });
        
    }





  return (
    <div className="bg-zinc-400 h-[92vh] flex flex-col">
            <div className="container h-fit max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form className="bg-white px-6 py-6 rounded shadow-md text-black w-full" onSubmit={registerSubmit}>
                    <h1 className="mb-8 text-3xl text-center">Registro de usuario</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        placeholder="Nombre completo" 
                        onChange={handleInput} value={registerInput.name} 
                        />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" 
                        onChange={handleInput} value={registerInput.email} 
                        />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        onChange={handleInput} value={registerInput.password} 
                        />
                    {/* <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirmar password" /> */}

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 text-white focus:outline-none my-1"
                    >Crear cuenta</button>

                    
                </form>

                <div className="text-grey-dark mt-6 flex gap-2 text-lg">
                    <p>
                    Ya tienes una cuenta? 
                    </p>
                    <Link className="border-b-2  border-green-500 text-black hover:border-green-400" to="/login">
                        Inicia sesión
                    </Link> 
                </div>
            </div>
        </div>
  )
}

export default RegistroView