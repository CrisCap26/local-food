import './restaurante.css'

function RegistrarRestaurante() {
  return (
    <form className='datos'>
      <font color="black">
        <h4>Registro de Restaurante</h4>
      </font>
      <input
        className="controls"
        type="text"
        name="Nombre del negocio"
        id="Nombre del negocio"
        placeholder="Ingrese el Nombre"
      />
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        defaultValue={""}
      />
      <input
        className="controls"
        type="text"
        name="Domicilio"
        id="Domicilio"
        placeholder="Ingrese el Domicilio"
      />
      <input
        className="controls"
        type="tel"
        name="Telefono"
        id="Telefono"
        placeholder="Ingrese el Telefono"
      />
      <h3>Hora de Abertura:</h3>
      <input
        className="controls"
        type="time"
        name="Horario"
        id="Horario"
        placeholder="Abierto"
      />
      <h3>Hora de Cierre:</h3>
      <input
        className="controls"
        type="time"
        name="Horario"
        id="Horario"
        placeholder="Cierre"
      />
      <input
        className="controls"
        type="text"
        name="Envio"
        id="Envio"
        placeholder="¿Cuenta con servicio a domicilio?"
      />
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese sus Redes Sociales"
        defaultValue={""}
      />
      <h3>Logotipo:</h3>
      <input
        className="controls"
        type="file"
        name="Logotipo"
        accept=".pdf,.jpg,.png"
        multiple=""
      />
      <h3>Foto del Local:</h3>
      <input
        className="controls"
        type="file"
        name="Imagen Portada"
        accept=".pdf,.jpg,.png"
        multiple=""
      />
      
      <input className="botons" type="submit" value="Registrar" />
    </form>
  );
}

export default RegistrarRestaurante;
