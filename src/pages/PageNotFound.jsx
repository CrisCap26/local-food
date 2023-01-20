import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = (props) => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  return (
    <main>
      <h1>Página no encontrada</h1>
      <button onClick={goHome}>Volver a inicio</button>
    </main>
  );
};

export default PageNotFound;
