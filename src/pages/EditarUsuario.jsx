import { useState, useEffect } from "react";
import { update, get } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { expresiones } from "./utils";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { config } from "../config";

function EditarUsuario() {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const { getItem: getToken } = useLocalStorage("token");
  const { getItem: getUserId } = useLocalStorage("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, []);

  const { register, handleSubmit, setValue } = useForm();

  //Traer y mostrar datos actuales en el formulario
  useEffect(() => {
    get(getToken(), getUserId()).then((response) => {
      setUsername(response.data.username);
      setValue('name', response.data.name ?? '');
      setValue('last_name', response.data.last_name ?? '');
      setValue('phone_number', response.data.phone_number ?? '');
      setValue('email', response.data.email ?? '');
      setImage(response.data.profile_image === '/media/images/placeholder_user.png' ? null : config.backendUrl + response.data.profile_image);
      setId(response.data.id);
    });
  }, []);

  const onSubmit = data => {
    const userToUpdate = {
      name: data.name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
    };
    if (data.profile_image.length > 0) {
      userToUpdate.profile_image = data.profile_image[0];
    }

    update(userToUpdate, id, getToken()).then((response) => {
      console.log("User updated succesfully", response);
      toast.success("Usuario actualizado correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/mi-usuario');
    });
  };

  return (
    <form className="user_form" onSubmit={handleSubmit(onSubmit)} >
      <center>
        <h1 className="user_form_titulo">Editar {username}</h1>
      </center>
      <br />
      <div className="formulario">
        <div className="field">
          <label>Nombre</label>
          <input
            id="nombre"
            {...register('name')}
          />
        </div>
        <div className="field">
          <label>Apellidos</label>
          <input
            id="apellidos"
            {...register('last_name')}
            />
        </div>
        <div className="field">
          <label>Teléfono</label>
          <input
            id="tel"
            {...register('phone_number')}
            />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input
            id="correo"
            {...register('email', {
              validate: (email) => {
                if (email.length === 0) {
                  return true;
                }
                return expresiones.correo.test(email);
              },
            })}
          />
        </div>
        {image && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <p>Imagen de perfil actual</p>
          <img src={image} alt="Imagen de perfil actual del usuario" style={{width: '200px', marginTop: '8px', marginBottom: '8px'}} />
        </div>}
        <div className="field">
          <label>Nueva imagen de perfil</label>
          <input
            type="file"
            id="profileImg"
            {...register('profile_image')}
          />
        </div>
        <div className="submit">
          <center>
          <button id="btn-enviar" type="submit" >Actualizar</button>
          </center>
        </div>
      </div>
    </form>
  );
}

export default EditarUsuario;
