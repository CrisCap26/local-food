import React from 'react'
import './comentarios.css'

function Comentarios(props) {

    const formatDate = (date) => {
        const datePart = date.match(/\d+/g);
        const year = datePart[0];
        const month = datePart[1];
        const day = datePart[2];

        return day+'/'+month+'/'+year;
    }

    return (
        <>
            <section className="cont-comentarios">
                {
                    props.comentarios?.map((comentario, i) => {
                        return (
                            <div className="comentario" key={i}>
                                <div className="nom-user size-text">
                                    <p>{comentario.user.username}</p>
                                </div>
                                <div className="info-coment">
                                    <p className="text-com size-text">{comentario.text}</p>
                                    <p className="fecha-com size-fecha">{formatDate(comentario.created_at)}</p>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    props.comentarios == 0 ?
                    <h4>Aún no hay comentarios</h4>
                    :
                    <></>
                }
            </section>
        </>
    )
}

export default Comentarios