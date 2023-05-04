import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './restaurante.css'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { create } from '../services/localfoodService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function RegistrarRestaurante() {
  const { getItem: getToken } = useLocalStorage('token');
  const { getItem: getLocalfoodId, saveItem: saveLocalfoodId } = useLocalStorage('localfoodId');
  const navigate = useNavigate();

  useEffect(() => {
    if(!getToken()) {
      navigate('/login');
    } else if(!!getLocalfoodId()) {
      navigate('/mi-negocio');
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const localfood = {
      "name": data.name,
      "description": data.description,
      "address": data.address,
      "phone_number": data.phone_number,
      "schedule": data.schedule,
      "has_delivery": data.has_delivery,
    }
    if (data.profile_image.length > 0) {
      localfood.profile_image = data.profile_image[0];
    }
    // if (data.banner_image.length > 0) {
    //   localfood.banner_image = data.banner_image[0];
    // }
    create(localfood, getToken()).then(response => {
      console.log('Localfood created succesfully', response);
      toast.success("Negocio creado correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      saveLocalfoodId(response.data.id);
      navigate('/mi-negocio');
    });
  };

  return (
    <form className='datos' onSubmit={handleSubmit(onSubmit)}>
      <font color="black">
        <h4>Registro de Restaurante</h4>
      </font>
      <h3>Nombre: </h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <input
        className="controls"
        id="nombre"
        placeholder="Ingrese el Nombre"
        {...register('name', {
          required: true
        })}
      />
      <h3>Descripción: </h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        id='descripcion'
        {...register('description', {
          required: true
        })}
      />
      <h3>Domicilio: </h3>
      <input
        className="controls"
        id="domicilio"
        placeholder="Ingrese el Domicilio"
        {...register('address')}
      />
      <h3>Teléfono:</h3>
      <input
        className="controls"
        type="tel"
        id="tel"
        placeholder="Ingrese el Telefono"
        {...register('phone_number')}
      />
      <h3>Horario:</h3>
      <input
        className="controls"
        id="horario"
        placeholder="9:00am - 3:00pm"
        {...register('schedule')}
      />
      <h3>¿Cuenta con servicio a domicilio?</h3>
      <span className="campo_requerido_res">* Este campo es requerido</span>
      <select
      className='controls'
      id='select'
      {...register('has_delivery', {
        required: true
      })}
      >
        <option value={true}>Sí</option>
        <option value={false}>No</option>
      </select>
      <h3>Logotipo:</h3>
      <input
        id='logoRes'
        className="controls"
        type="file"
        {...register('profile_image')}
      />
      {/* <h3>Foto del Local:</h3>
      <input
        id='foto'
        className="controls"
        type="file"
        {...register('banner_image')}
      /> */}
      <button id="btn-enviar" className='botons' type="submit" >Registrar</button>
    </form>
  );
}

export default RegistrarRestaurante;
