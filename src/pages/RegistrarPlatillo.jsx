import './reg_platillo.css'

function RegistrarPlatillo() {
  return (
    
    <form className="datos__pla">
      <font color="black">
        <h4>Registro de Platillos</h4>
      </font>
      <input
        className="controls"
        type="text"
        name="Nombre del platillo"
        id="Nombre del platillo"
        placeholder="Ingrese el Nombre"
      />
      <textarea
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        defaultValue={""}
      />
      <h3>Foto del Platillo:</h3>
      <input
        className="controls"
        type="file"
        name="Imagen Platillo"
        accept=".pdf,.jpg,.png"
        multiple=""
      />
      <input
        className="controls"
        type="number"
        name="Precio"
        id="Precio Platillo"
        placeholder="Ingrese el Precio"
      />
      <input className="botons" type="submit" value="Registrar" />
    </form>
  );
}

export default RegistrarPlatillo;
