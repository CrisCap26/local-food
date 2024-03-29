import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import NavBar from "./components/NavBar";
import AcercaDeNostros from './pages/AcercaDeNostros';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PerfilRestaurante from './pages/PerfilRestaurante';
import RegistrarPlatillo from './pages/RegistrarPlatillo';
import RegistrarRestaurante from './pages/RegistrarRestaurante';
import RegistrarUsuario from './pages/RegistrarUsuario';
import { MyUser } from './pages/User/MyUser';
import { User } from './pages/User/User';
import { MyLocalfood } from './pages/Localfood/MyLocallfood';
import EditarRestaurante from './pages/EditarRestaurante';
import EditarUsuario from './pages/EditarUsuario';
import EditarPlatillo from './pages/EditarPlatillo';
import PageNotFound from './pages/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import VerRestaurantes from './pages/VerRestaurantes';
import { getInfoFromToken } from './services/authService';
import VerMisPlatillos from './pages/VerMisPlatillos';
import VerPlatillos from './pages/VerPlatillos';

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { getItem: getToken } = useLocalStorage('token');
  const { item: localfoodId, getItem: getLocalfoodId, saveItem: saveLocalfoodId } = useLocalStorage('localfoodId');

  useEffect(() => {
    setIsLogedIn(!!getToken());
    if (!!getToken() && !getLocalfoodId()) {
      getInfoFromToken(getToken()).then(response => {
        saveLocalfoodId(response.data.localfood.id);
      });
    }
  }, [isLogedIn]);

  return (
    <BrowserRouter>
      <NavBar isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} hasLocalfood={!!localfoodId} />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login setIsLogedIn={setIsLogedIn}/>}/>
        <Route path='/RegistrarPlatillo' element={<RegistrarPlatillo/>}/>
        <Route path='/RegistrarRestaurante' element={<RegistrarRestaurante/>} />
        <Route path='/RegistrarUsuario' element={<RegistrarUsuario/>} />
        <Route path='/mi-usuario' element={<MyUser/>} />
        <Route path='/usuario/:userId' element={<User/>} />
        <Route path='/mi-negocio' element={<MyLocalfood/>} />
        <Route path='/AcercaDeNosotros' element={<AcercaDeNostros/>} />
        <Route path='/PerfilRestaurante/:localfoodId' element={<PerfilRestaurante localfoodOwnerId={localfoodId} />} />
        <Route path='/ChangePassword' element={<ChangePassword/>} />
        <Route path='/editar-negocio' element={<EditarRestaurante/>} />
        <Route path='/editar-usuario' element={<EditarUsuario/>} />
        <Route path='/editar-platillo/:productId' element={<EditarPlatillo/>} />
        <Route path='/verRestaurantes' element={<VerRestaurantes/>} />
        <Route path='/mis-platillos' element={<VerMisPlatillos/>} />
        <Route path='/mis-platillos/:localfoodId' element={<VerPlatillos/>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
