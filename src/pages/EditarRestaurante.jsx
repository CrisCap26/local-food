import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { get, update } from "../services/localfoodService";
import { useForm } from "react-hook-form";
import { config } from "../config";

function EditarRestaurante() {
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const { getItem: getToken } = useLocalStorage("token");
  const { getItem: getLocalfoodId } = useLocalStorage("localfoodId");
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, []);

  //Traer y mostrar datos actuales
  useEffect(() => {
    get(getLocalfoodId()).then((response) => {
      setValue('name', response.data.name ?? '');
      setValue('description', response.data.description ?? '');
      setValue('address', response.data.address ?? '');
      setValue('phone_number', response.data.phone_number ?? '');
      setValue('schedule', response.data.schedule ?? '');
      setImage(response.data.profile_image === "/media/images/placeholder_localfood.png" ? null : config.backendUrl + response.data.profile_image);
      setId(response.data.id);
    })
  },[])

  const onSubmit = (data) => {
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
    update(localfood, id, getToken()).then(data => {
      console.log('Localfood updated succesfully', data);
      toast.success("Negocio actualizado correctamente", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      navigate('/mi-negocio');
    });
  };

  return (
    <form className="datos" onSubmit={handleSubmit(onSubmit)}>
      <font color="black">
        <h4>Editar el Restaurante</h4>
      </font>
      <h3>Nombre: </h3>
      <input
        className="controls"
        id="nombre"
        placeholder="Ingrese el Nombre"
        {...register('name', {
          required: true
        })}
      />
      <h3>Descripción: </h3>
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
      {image && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <p>Logotipo actual</p>
        <img src={image} alt="Imagen de perfil actual del usuario" style={{width: '200px', marginBottom: '16px'}} />
      </div>}
      <h3>Logotipo nuevo:</h3>
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
      <button id="btn-enviar" className='botons' type="submit" >Editar</button>
    </form>
  );
}

export default EditarRestaurante;
