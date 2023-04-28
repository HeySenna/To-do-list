import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import TitlePage from '../../components/TitlePage'

const clientes = [
  {
    id: 1,
    nome: 'Microsoft',
    responsavel: 'Otto',
    contato: '33889922',
    situacao: 'Ativo'
  },
  {
    id: 2,
    nome: 'Amazon',
    responsavel: 'Willian',
    contato: '55448842',
    situacao: 'Desativado'
  },
  {
    id: 3,
    nome: 'Google',
    responsavel: 'Bill',
    contato: '55448899',
    situacao: 'Em Análise'
  },
  {
    id: 4,
    nome: 'Facebook',
    responsavel: 'Kevin',
    contato: '75881515',
    situacao: 'Ativo'
  },
  {
    id: 5,
    nome: 'Twitter',
    responsavel: 'Jack',
    contato: '00226548',
    situacao: 'Ativo'
  }
]
const ClienteLista = () => {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente).join(' ')
    .toLowerCase()
    .includes(termoBusca.toLowerCase())
  });

  const novoCliente = () => {
    navigate('/cliente/detalhe');
  }
  return (
    <>
      <TitlePage title='Cliente Lista'>
        <Button variant='outline-secondary' onClick={novoCliente}>
          <i className='fas fa-plus me-2'></i>
          Novo Cliente
        </Button>
      </TitlePage>
        <InputGroup className='mt-3 mb-3'>
          <InputGroup.Text>Buscar</InputGroup.Text>
          <FormControl
              onChange={handleInputChange} placeholder='Buscar por nome do cliente'
          />
        </InputGroup>
      <table className="table table-striped table-hover">
        <thead className='table-dark mt-3'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
        {clientesFiltrados.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.responsavel}</td>
            <td>{cliente.contato}</td>
            <td>{cliente.situacao}</td>
            <td>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2" 
                  onClick={() =>
                    navigate(
                      `/cliente/detalhe/${cliente.id}`
                    )
                  }
                  >
                  <i className='fas fa-user-edit me-2'></i>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger me-2">
                  <i className='fas fa-user-times me-2'></i>
                  Desativar
                </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}


export default ClienteLista;