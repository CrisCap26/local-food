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
import { MyAccount } from './pages/Account/MyAccout';
import { MyUser } from './pages/User/MyUser';
import { User } from './pages/User/User';
import { MyLocalfood } from './pages/Localfood/MyLocallfood';
import EditarRestaurante from './pages/EditarRestaurante';
import EditarUsuario from './pages/EditarUsuario';
import EditarPlatillo from './pages/EditarPlatillo';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/RegistrarPlatillo' element={<RegistrarPlatillo/>}/>
        <Route path='/RegistrarRestaurante' element={<RegistrarRestaurante/>} />
        <Route path='/RegistrarUsuario' element={<RegistrarUsuario/>} />
        <Route path='/mi-cuenta' element={<MyAccount/>} />
        <Route path='/mi-usuario' element={<MyUser/>} />
        <Route path='/usuario/:userId' element={<User/>} />
        <Route path='/mi-negocio' element={<MyLocalfood/>} />
        <Route path='/AcercaDeNosotros' element={<AcercaDeNostros/>} />
        <Route path='/PerfilRestaurante/:localfoodId' element={<PerfilRestaurante/>} />
        <Route path='/ChangePassword' element={<ChangePassword/>} />
        <Route path='/editar-negocio/:idLocalfood' element={<EditarRestaurante/>} />
        <Route path='/editar-usuario/:userId' element={<EditarUsuario/>} />
        <Route path='/editar-platillo/:productId' element={<EditarPlatillo/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
