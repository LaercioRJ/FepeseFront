export class State {
    estado_id!: number;
    nome: string;
    sigla: string;

    constructor(name: string, acronym: string) {
        this.nome = name;
        this.sigla = acronym;
    }
}