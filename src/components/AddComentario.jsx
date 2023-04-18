import React from 'react'
import { useParams } from "react-router-dom";
import './comentarios.css'
import imgUser from '../imgs/icon-user.png'
import { addComment } from '../services/localfoodService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';


function AddComentario() {
    const [comentario, setComentario] = React.useState("");
    const params = useParams();
    const { getItem } = useLocalStorage("token");

    const onSubmit = (e) => {
        e.preventDefault();
        addComment(params.localfoodId, getItem(), comentario).then(()=> {
            toast.success("Comentario creado correctamente", {
                position: toast.POSITION.BOTTOM_LEFT
              });
        })
        .catch(()=> {
            toast.error("Error al crear el comentario", {
                position: toast.POSITION.BOTTOM_LEFT
              });
        })
    }
    return (
        <section className="cont-add-coment">
            <form className="contenedor-agg-com" onSubmit={onSubmit}>
                <div className="imagen-usuario">
                    <img src={imgUser} />
                </div>
                
                    <input
                        id="nuevoComentario"
                        type="text"
                        placeholder="Nuevo Comentario..."
                        value={comentario}
                        onChange={(e)=> setComentario(e.target.value) }
                    />
                    
                        <button type="submit">Comentar</button>
                    
                
            </form>
        </section>
    )
}

export default AddComentario