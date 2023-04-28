import React from 'react'
import { AtividadeItemProps } from '../../model/atividadesProps'
import { Prioridade } from '../../model/atividade'



const AtividadeItem = ({
    ativ,
    pegarAtividade,
    handleConfirmModal

  }: AtividadeItemProps
  ) => {
    
  function prioridadeLabel(param: string){
    switch(param){
      case Prioridade.Baixa:
      case Prioridade.Normal:
      case Prioridade.Alta:
        return param
      default:
        return 'Não definido';
    }
}

function prioridadeStyle(param: string, icone: boolean){
  switch (param){
    case Prioridade.Baixa:
      return icone ? 'me-1 fa-regular fa-face-smile': 'success';
    case Prioridade.Normal:
      return icone ? 'me-1 fa-regular fa-face-meh': 'dark';
    case Prioridade.Alta:
      return icone ? 'fa-regular fa-face-frown': 'warning';
    default:
      return 'Não definido';
  }
}
  return (
      <div className={"card mb-2 shadow-sm border-" + prioridadeStyle(ativ.prioridade, false)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-2">
              {ativ.id}
              </span>
              - {ativ.titulo}
          </h5>
          <h6> 
              Prioridade:
              <span className={"ms-1 text-" + prioridadeStyle(ativ.prioridade, false)}>
                <i className={"me-1 fa-regular fa-face-smile" + prioridadeStyle(ativ.prioridade, true)}></i>
                {prioridadeLabel(ativ.prioridade)}
              </span>
            </h6>
        </div>
        <p className="card-text">{ativ.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
            <button className="btn btn-sm btn-outline-primary me-2"
              onClick={() => pegarAtividade(ativ.id)}
            >
              <i className="fas fa-pen me-2"></i>
              Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleConfirmModal(ativ.id)}>
              <i className ="fas fa-trash me-2"></i>
              Deletar
            </button>
        </div>
      </div>
    </div>
  )
  }

export default AtividadeItem;