import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { get, update } from '../services/productService';

function EditarPlatillo() {
  const [nombre, setNombre] = useState("");
  const [descrPlatillo, setDescrPlatillo] = useState("");
  const [foto, setFoto] = useState("");
  const [precio, setPrecio] = useState(undefined);
  const [id, setId] = useState(null);
  const { getItem } = useLocalStorage("token");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!getItem()) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    get(getItem(), params.productId).then((response) => {
        setId(response.data.id);
        setNombre(response.data.name);
        setDescrPlatillo(response.data.description);
        setPrecio(response.data.price);
    })
  },[]);
  console.log(id, nombre, descrPlatillo)
  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name: nombre,
      description: descrPlatillo,
      price: precio,
      category: 1,
    };
    update(product, id, getItem()).then((data) => {
      console.log("Platillo created succesfully", data);
      navigate('/mi-negocio');
    });
  };
  return (
    <form className="datos__pla" onSubmit={handleSubmit}>
      <font color="black">
        <h4>Editar Platillo</h4>
      </font>
      <h3>Nombre del Platillo:</h3>
      <input
        className="controls"
        type="text"
        name="Nombre"
        id="nombrePlat"
        placeholder="Ingrese el Nombre"
        onChange={(e) => setNombre(e.target.value)}
        value={nombre}
        required
      />
      <h3>Descripción: </h3>
      <textarea
        id="descripcionPlat"
        className="controls"
        cols={20}
        rows={5}
        placeholder="Ingrese la Descripcion"
        onChange={(e) => setDescrPlatillo(e.target.value)}
        value={descrPlatillo}
        required
      />
      <h3>Precio:</h3>
      <input
        id="precio"
        className="controls"
        type="number"
        name="Precio"
        placeholder="Ingrese el Precio"
        min={0}
        onChange={(e) => setPrecio(e.target.value)}
        value={precio}
        required
      />
      <h3>Elegir categoria: </h3>
      <select className="controls" name="select" id="select">
        <option value={1}>categoria 1</option>
        {/* <option value={2}>categoria 2</option>
      <option value={3}>categoria 3</option> */}
      </select>
      {/* <h3>Foto del Platillo:</h3>
    <input
      id='fotoPlat'
      className="controls"
      type="file"
      name="Imagen Platillo"
      accept=".pdf,.jpg,.png"
      multiple=""
    /> */}
      <input className="botons" type="submit" value="Modificar" />
    </form>
  );
}

export default EditarPlatillo;
