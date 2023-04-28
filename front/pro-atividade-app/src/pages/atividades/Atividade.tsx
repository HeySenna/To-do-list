import {useState, useEffect} from 'react';
import {Button, Modal} from 'react-bootstrap';
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import api from '../../api/atividade';
import TitlePage from '../../components/TitlePage';
import { toast, ToastContainer } from 'react-toastify';
import { IAtividade, Prioridade } from '../../model/atividade';

const atividadeInicial: IAtividade= {
  id: 0,
  titulo: '',
  prioridade: Prioridade.NaoDefinido,
  descricao: ''
};


const Atividade = () => {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);
  
  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id: number) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    }
    else{
      setAtividade(atividadeInicial)
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  }

  const pegaTodasAtividades = async() => {
    const response = await api.get('atividade');
    return response.data;
  };
  
  const novaAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtividadeModal();
  };
  
  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);
  
  const addAtividade = async(ativ: IAtividade) => {
    handleAtividadeModal();
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
    toast.info("Adicionado com sucesso!");   
  };

  function cancelarAtividade() {
    setAtividade(atividadeInicial);
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ: IAtividade) => {
    handleAtividadeModal();
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const {id} = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade(atividadeInicial);
    toast.success("Atualizado com sucesso!");
  }
  
 
  const deletarAtividade = async (id: number) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
      setAtividades([...atividadesFiltradas])
      toast.error("Excluído com sucesso!");
    }
    
  };

  function pegarAtividade(id: number){
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();

  }
  return (
    <>
      <TitlePage title={'Atividade ' + (atividade.id !== 0 ? atividade.id : "")}
      >
        <Button variant="outline-secondary" onClick={novaAtividade}>
        <i className="fas fa-plus"> </i>
        </Button>
      </TitlePage>
    

      <AtividadeLista
          atividades={atividades}
          pegarAtividade={pegarAtividade}
          handleConfirmModal={handleConfirmModal}
      />

        <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Atividade {atividade.id !== 0 ? atividade.id : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AtividadeForm
              addAtividade={addAtividade}
              ativSelecionada={atividade} 
              atualizarAtividade={atualizarAtividade}
              cancelarAtividade={cancelarAtividade}
            />
          </Modal.Body>
        </Modal>

        <Modal 
          size = "sm"
          show={smShowConfirmModal}
          onHide={() => handleConfirmModal(atividade.id)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Excluindo a Atividade{' '}
              {atividade.id !== 0 ? atividade.id : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja Excluir a Atividade {atividade.id}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-success me-2" onClick={() => deletarAtividade(atividade.id)}>
              <i className="fas fa-check me-2"></i>
              Sim
            </button>
            <button className="btn btn-outline-danger me-2" onClick={() => handleConfirmModal(0)}>
              <i className="fas fa-times me-2"></i>
              Não
            </button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
    </>
  );
}

export default Atividade;