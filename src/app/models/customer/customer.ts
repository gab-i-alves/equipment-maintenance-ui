export class Customer{
    
    constructor(
        public id: string,
        public nome : string,
        public telefone: string,
        public email : string,
        public cpf: string,
        public ativo : boolean = true,
        public tipoPerfil: {
            id : string,
            descricao: string
        },
        public endereco : {
            estado: string,
            cidade: string,
            bairro: string,
            logradouro: string,
            complemento: string,
            cep: string,
            numero: string
        }
    ){}
}
