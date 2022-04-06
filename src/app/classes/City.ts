export class City {
    cidade_id!: number;
    nome: string;
    estado_id: number;

    constructor(name: string, stateId: number) {
        this.nome = name;
        this.estado_id = stateId;
    }
}