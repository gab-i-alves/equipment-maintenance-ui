import { RequestStatus } from "./enums/requestStatus";

export interface SolicitacaoRequest{

    estadoSolicitacao: estadoSolicitacao,
    dataHoraCriacao: Date,
    id: number,
    descricao:String,
    cliente: Cliente,
    descricaoDefeito: string,
    motivoRejeicao:String,
    descricaoEquipamento:String
    categoriaEquipamento:CategoriaEquipamento
  

}

export interface Cliente{
    ativo: Boolean,
    nome: String,
    dataCriacao: String,
    email: String
    endereco: Endereco,
    senha: String,
    tipoPerfil: tipoPerfil
}

export interface Endereco{
    cep: String,
    bairro: String,
    cidade: String,
    complemento: String,
    estado: String,
    id: Number,
    lagradouro: String,
    numero: Number
}
export interface estadoSolicitacao{
    descricao: String,
    id: Number,

}

export interface CategoriaEquipamento {
    id: String,
    descricao: String
}

export interface tipoPerfil {
    id: number,
    descricao: String
}