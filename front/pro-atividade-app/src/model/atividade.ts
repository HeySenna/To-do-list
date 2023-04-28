export enum Prioridade {
  NaoDefinido = 'NãoDefinido',
  Baixa = 'Baixa',
  Normal = 'Normal',
  Alta = 'Alta'
}

export interface IAtividade {
    id: number;
    prioridade: Prioridade;
    titulo: string;
    descricao: string;
  }
