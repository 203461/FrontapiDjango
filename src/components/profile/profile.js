import axios from "axios";
import { useState } from "react";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");

  let formdata = new FormData();

  function go_home() {
    window.location = "/";
  }

  function get_items() {
    console.log(localStorage.getItem("localId"));
    axios
      .get(
        "http://localhost:8000/api/v1/profile/" +
          localStorage.getItem("localId"),
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("localToken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        document.getElementById("user").placeholder = res.data.usuario;
        document.getElementById("nombre").placeholder = res.data.nombre;
        document.getElementById("apellido").placeholder = res.data.apellido;
        document.getElementById("email").placeholder = res.data.email;
        document.getElementById("img").src =
          "http://localhost:8000/assets" + res.data.img;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  window.onload = get_items;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        "http://localhost:8000/api/v1/profile/" +
          localStorage.getItem("localId"),
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("localToken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        document.getElementById("user").placeholder = res.data.usuario;
        document.getElementById("nombre").placeholder = res.data.nombre;
        document.getElementById("apellido").placeholder = res.data.apellido;
        document.getElementById("email").placeholder = res.data.email;
        document.getElementById("img").src =
          "http://localhost:8000/assets" + res.data.img;

        if (res.data.img === "/img-profile/profile_unknow.png") {
          if (img !== "") {
            formdata.append("url_img", img);
            formdata.append("id_user", localStorage.getItem("localId"));

            axios
              .post("http://localhost:8000/api/v1/profile", formdata, {
                headers: {
                  Authorization: "Token " + localStorage.getItem("localToken"),
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log(res.data);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert("Carga una imagen");
          }
        } else {
          formdata.append("url_img", img);
          formdata.append("id_user", localStorage.getItem("localId"));
          formdata.append("user", user);
          formdata.append("email", email);
          formdata.append("name", name);
          formdata.append("apellido", apellido);
          axios
            .put("http://localhost:8000/api/v1/profile", formdata, {
              headers: {
                Authorization: "Token " + localStorage.getItem("localToken"),
                "content-type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data);
              axios
                .get(
                  "http://localhost:8000/api/v1/profile/" +
                    localStorage.getItem("localId"),
                  {
                    headers: {
                      Authorization:
                        "Token " + localStorage.getItem("localToken"),
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  document.getElementById("user").placeholder =
                    res.data.usuario;
                  document.getElementById("nombre").placeholder =
                    res.data.nombre;
                  document.getElementById("apellido").placeholder =
                    res.data.apellido;
                  document.getElementById("email").placeholder = res.data.email;
                  document.getElementById("img").src =
                    "http://localhost:8000/assets" + res.data.img;
                  window.location.reload();
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };
  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <div className="text-center container div_main">
      <div className="text-center container m-5 ">
        <div className="container  img_profile">
          <img alt="avatar" className="img_photo" id="img" />
        </div>
        <h4>Sube una foto </h4>
      </div>

      <div class="div_img">
        <input
          type="file"
          class="form-control input_img"
          onChange={handleImgChange}
        />
      </div>

      <div className="container">
        <form className="form mb-5" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col">
                <label className="m-3">
                  <h5>Usuario: </h5>
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="user"
                  title="Actualizar usuario"
                  onChange={handleUserChange}
                />
              </div>

              <div className="col">
                <label className="m-3">
                  <h5>Nombre:</h5>
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="nombre"
                  title="Actualizar nombre"
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col">
                <label className="m-3">
                  <h5>Apellido</h5>
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="apellido"
                  title="Actualizar apellido"
                  onChange={handleApellidoChange}
                />
              </div>

              <div className="col">
                <label className="m-3">
                  <h5>Email</h5>
                </label>
                <input
                  type="email"
                  className="form-control text-center"
                  id="email"
                  title="Actualizar email"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>

          <div className="button1">
            <button className="btn" type="submit">
              <i className="glyphicon glyphicon-ok-sign"></i> Save
            </button>
          </div>

          <div className="button2">
            <button className="btn" onClick={go_home}>
              {" "}
              Log out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
