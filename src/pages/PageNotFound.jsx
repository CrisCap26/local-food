import React from "react";
import { useNavigate } from "react-router-dom";
import './pageNotFound.css'
import pageNotFoundImg from '../imgs/PageNotFound.png'

const PageNotFound = (props) => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  return (
    <main className="notFound_container">
      <h1 className="notFound_title">Página no encontrada</h1>
      <img
        src={pageNotFoundImg}
        alt="notFound"
        className="notFound_img"
      />
      <button className="notFound_button" onClick={goHome}>Volver a inicio</button>
    </main>
  );
};

export default PageNotFound;
