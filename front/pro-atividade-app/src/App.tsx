import Atividade from './pages/atividades/Atividade'
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Cliente from './pages/clientes/Cliente';
import ClienteForm from './pages/clientes/ClienteForm';
import Dashboard from './pages/dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound';
 
const App = () => {
  return (
    <Routes>  
      <Route path ='/' element={<Dashboard />} />
      <Route path ='/atividade/*' element={<Atividade/>}/>
      <Route path ='/atividade/:id/cliente' element={<Atividade/>}/>
      <Route path ='/cliente/*' element={<Cliente/>} />
      <Route path ='/cliente/:id/atividade' element={<Atividade/>} />
      <Route path ='/cliente/detalhe' element={<ClienteForm/>} />
      <Route path ='/cliente/detalhe/:id' element={<ClienteForm/>} />
      <Route path = '*' element={<PageNotFound/>} />
    </Routes>
  );
 
}

export default App;