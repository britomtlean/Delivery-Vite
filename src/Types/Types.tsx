export type Product = {
    id?: string;
    nome: string;
    descricao?: string;
    categoria?: string;
    disponibilidade?: boolean;
    valor?: number;
    estoque?: number;
    imagem?: string;
    dataCriacao?: string;
};

export type Login = {
    cpf: string;
    password: string;
};

export type User = {
    id?: string;
    nome: string;
    cpf: string;
    senha: string;
};
