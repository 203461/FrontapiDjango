import axios from 'axios';
import React, { Component } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";
import './Register.css';

function App() {
  const navigate=useNavigate();


  const consumir_crear = () => {
    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('pass').value,
      password2: document.getElementById('pass2').value,
      email: document.getElementById('correo').value,
      first_name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellido').value
  
    }
    // alert("Hola login");
    axios
      .post("http://localhost:8000/api/v1/registro_nuevo/", postData, {
        Headers: { 
          'Content-Type': 'application/json', 
          
        },
      })
      .then(response => {
        console.log(response.data);
        alert('Registro exitoso, porfavor haz login')
        navigate('/Login')
      }).catch(
        (error) => {
          console.log(error.response.data);
        }

      )
  }

  const pruebaLocalStorage =()=>{
    alert('Token: ' + localStorage.getItem("localToken"))
  }



  return (

    <div class="big-info">

      <div>
        <div class="container3">
          <form class= "Hola">
            <label class="form-label mt-5">
              Ingrese el nombre del usuario:
            </label>
            <input class="form-control" type="text" placeholder='Usuario' id ='user' required />
            <label class="form-label mt-5">
              Ingresa la contraseña:
            </label>
            <input class="form-control" type="password"  placeholder='Contraseña' id = 'pass' required />
            <label class="form-label mt-5">
              Ingresa la contraseña de nuevo:
            </label>
            <input class="form-control" type="password" placeholder='Contraseña otra vez' id = 'pass2' required />
            <label class="form-label mt-5">
              Ingrese el correo:
            </label>
            <input class="form-control" type="text"  placeholder='correo' id = 'correo' required />
            <label class="form-label mt-5">
              Ingrese el nombre:
            </label>
            <input class="form-control" type="text" placeholder='Nombre' id = 'nombre' required />
            <label class="form-label mt-5">
              Ingrese apellido:
            </label>
            <input class="form-control " type="text" placeholder='Apellido' id = 'apellido' required />
          </form>
          <button class="button " onClick={consumir_crear}>Crear Usuario</button>
          
        </div>
        
      </div>
        

    </div>

  );



}

export default App;