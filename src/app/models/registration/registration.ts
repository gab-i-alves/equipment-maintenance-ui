export class Registration {
    
    constructor(
       private nome : string,
       private email : string,
       private cpf: string,
       private telefone: string,
       private ativo : boolean = true,
       private tipoPerfil: {
        id : string,
        descricao: string
       },
       private endereco : {
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
