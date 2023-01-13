import "./reg_usu.css";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from "../imgs/logo.png";
import { useState, useEffect } from "react";
import {expresiones} from './utils'
import cheque from '../imgs/cheque.png'
import mal from '../imgs/cerrar.png'
import { create } from '../services/userService';

function RegistrarUsuario() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [validPasswords, setValidPasswords] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('name', data.username);
    formData.append('last_name', data.last_name);
    formData.append('phone_number', data.phone_number);
    formData.append('email', data.email);
    formData.append('profile_image', data.profile_image[0]);

    create(formData).then(res => {
      console.log('User created succesfully', res);
      navigate('/login');
    });
  };

  useEffect(() => {
    setValidPasswords(password === password2);
    console.log(password, password2)
  }, [password, password2]);

  const onCheckedChange = () => {
    const toggle = !isChecked;
    setIsChecked(toggle);
  }

  return (
    <form className="user_form" onSubmit={handleSubmit(onSubmit)} >
      <center>
        <h1 className="user_form_titulo">Formulario de Registro</h1>
      </center>
      <center>
        <img src={logo} alt="Logotipo" width={100} height={80} />
      </center>
      <p className="user_form__paragraph">
        ¿Ya tienes una cuenta?{" "}
        <a href="/Login" className="form__link">
          Entra aqui
        </a>
      </p>
      <br/>
      <div className="formulario">
        <div className="field">
          <label>Usuario</label>
          <input
            id="usuario"
            placeholder="Nombre de Usuario"
            {...register('username', {
              required: true,
            })}
          />
        </div>
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
          <label>Telefono</label>
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
        <p id="invalidEmail" className="noCoinciden">El email es invalido</p>
        <div className="field">
          <label>Contraseña</label>
          <input
            type="password"
            id="contra"
            {...register('password', {
              required: true,
              minLength: 6,
              onChange: (e) => {
                setPassword(e.target.value);
              },
            })}
          />
        </div>
        {/* <p id="invalidPass" className="noCoinciden">La contraseña debe tener entre 6 y 12 caracteres</p> */}
        <div className="field">
          <label>Repetir contraseña</label>
          <input
            type="password"
            id="contra2"
            {...register('password2', {
              required: true,
              minLength: 6,
              onChange: (e) => {
                setPassword2(e.target.value);
              },
            })}
          />
        </div>
          {!validPasswords &&
            <p id="message1" className="pass_noCoinciden">Las contraseñas no coinciden
              <img className="icon" src={mal}/>
            </p>
          }
        <div className="field">
          <label>Imagén de perfil</label>
          <input
            type="file"
            id="profileImg"
            {...register('profile_image')}
          />
        </div>

        <div className="privacidad">
          <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={onCheckedChange}
          required />
          <label>He leído y acepto la política de privacidad</label>
        </div>
        <div className="submit">
          <center>
            <button id="btn-enviar" type="submit" disabled={!isChecked || !validPasswords}>Registrarme</button>
          </center>
        </div>
      </div>
    </form>
  );
}

export default RegistrarUsuario;
