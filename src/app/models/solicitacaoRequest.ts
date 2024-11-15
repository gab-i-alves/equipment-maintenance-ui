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

interface Cliente{
    ativo: Boolean,
    nome: String,
    dataCriacao: String,
    email: String
    endereco: Endereco,
    senha: String,
    tipoPerfil: String
}

interface Endereco{
    cep: String,
    bairro: String,
    cidade: String,
    complemento: String,
    estado: String,
    id: Number,
    lagradouro: String,
    numero: Number
}
interface estadoSolicitacao{
    descricao: String,
    id: Number,

}

interface CategoriaEquipamento {
    id: String,
    descricao: String
}