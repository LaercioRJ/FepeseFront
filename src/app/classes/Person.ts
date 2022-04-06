export class Person {
    id!: number;
    nome: string;
    cpf: number;
    endereco: string;
    cidade_id: number;
    estado_id: number;

    constructor(name: string, cpf: number, address: string, stateId: number, cityId: number) {
        this.nome = name;
        this.cpf = cpf,
        this.endereco = address;
        this.estado_id = stateId;
        this.cidade_id = cityId;
    }
}