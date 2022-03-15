import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: user,
      password: password,
    };
    axios
      .post("http://localhost:8000/api/v1/login/", data)
      .then((res) => {
        alert("Registro exitoso\nUsuario: " + res.data.user_id);

        localStorage.setItem("localToken", res.data.token);
        localStorage.setItem("localId", res.data.user_id);

        window.location = "/Profile";
      })
      .catch((error) => {
        if (error.request.status == 400) {
          alert("Usuario invalido");
        } else {
          alert("Error de conexión");
        }
      });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <div>

      <div class="container mt-5">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label ">Nombre de usuario</label>
            <input
              type="text"
              class="form-control"
              placeholder="Usuario"
              onChange={handleUserChange}
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              placeholder="Contraseña"
              onChange={handlePasswordChange}
              required
            />
          </div>
          
          <button
            type="submit"
            class="button1"
          >
            Login
          </button>

          <Link to="/Register">
            <button
              type="submit"
              class="button2"
            >
              Signup
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
// import axios from "axios";

// function App() {

//   const consumir_login = () => {
//      var postData = {
//     username: "gellida7",
//     password: "Gellida7"
//   };
//     axios
//       .post("http://localhost:8000/api/v1/login",postData, {
//         Headers: { "Content-Type": "application/json", },
//       })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         //console.log(error.response.data.password[0]);
//         //console.log(error.response.data.username[0]);
//         console.log(error.response.data)
//       });
//   };

//   return (
//     <div>
//       <header className="app-header">
//         <button onClick={consumir_login}> Log in </button>
//       </header>
//     </div>
//   );
// }

// export default App;
