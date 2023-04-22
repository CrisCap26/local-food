import React from 'react'
import './comentarios.css'



function Cometarios(props) {

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
                                    <p className="fecha-com size-fecha">15-03-2024</p>
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

export default Cometarios