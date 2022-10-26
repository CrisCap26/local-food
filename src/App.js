import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import AcercaDeNostros from './pages/AcercaDeNostros';
import Home from './pages/Home';
import Login from './pages/Login';
import RegistrarPlatillo from './pages/RegistrarPlatillo';
import RegistrarRestaurante from './pages/RegistrarRestaurante';
import RegistrarUsuario from './pages/RegistrarUsuario';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/RegistrarPlatillo' element={<RegistrarPlatillo/>}/>
      <Route path='/RegistrarRestaurante' element={<RegistrarRestaurante/>} />
      <Route path='/RegistrarUsuario' element={<RegistrarUsuario/>} />
      <Route path='/AcercaDeNosotros' element={<AcercaDeNostros/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
