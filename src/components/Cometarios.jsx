import React from 'react'
import './comentarios.css'

function Cometarios() {
    return (
        <>
            <section className="cont-comentarios">
                <h2>Comentarios</h2>
                <div className="comentario" key="{comment.id}">
                    <div className="nom-user size-text">
                        <p>Juanito</p>
                    </div>
                    <div className="info-coment">
                        <p className="text-com size-text">Comentario ejemplo</p>
                        <p className="fecha-com">18-04-2023</p>
                    </div>
                </div>
                <div className="comentario" key="{comment.id}">
                    <div className="nom-user size-text">
                        <p>Cesia</p>
                    </div>
                    <div className="info-coment">
                        <p className="text-com size-text">Otroooo Comentario</p>
                        <p className="fecha-com size-fecha">15-03-2024</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cometarios