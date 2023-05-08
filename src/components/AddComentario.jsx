import React from 'react'
import { Link, useParams } from "react-router-dom";
import './comentarios.css'
import imgUser from '../imgs/icon-user.png'
import { addComment } from '../services/localfoodService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';
import { get } from "../services/userService"
import { config } from '../config';

function AddComentario(props) {
    const [comentario, setComentario] = React.useState("");
    const [userImage, setUserImage] = React.useState(imgUser);
    const params = useParams();
    const { getItem } = useLocalStorage("token");
    const { getItem: idUser } = useLocalStorage('userId');

    function getImageUser() {
        get(getItem(), idUser()).then((response) => {
            setUserImage(response.data.profile_image);
            if (response.data.profile_image) {
            setUserImage(config.backendUrl + response.data.profile_image);
            } else {
            setUserImage(imgUser);
            }
        });
    }

    React.useEffect(()=> {
        getImageUser();
    },[]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (comentario.trim().length === 0) return;

        addComment(params.localfoodId, getItem(), comentario.trim()).then((response) => {
            setComentario("");
            props.addComentario(response.data);
            toast.success("Comentario creado correctamente", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }).catch(() => {
            toast.error("Error al crear el comentario", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        })
    }
    return (
        <section className="cont-add-coment">
            <form className="contenedor-agg-com" onSubmit={onSubmit}>
                <div className="imagen-usuario">
                    <img src={userImage} />
                </div>
                <div className='input-com'>
                    <input
                        id="nuevoComentario"
                        type="text"
                        placeholder="Nuevo Comentario..."
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                    <div className='btn-agg'>
                        {getItem() ? <button type="submit">Comentar</button> : <Link className="btn-login" to='/Login'>Iniciar sesión</Link>}
                    </div>
                </div>
            </form>
        </section>
    )
}

export default AddComentario