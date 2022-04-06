export class Inscription {
    inscricao_id!: number;
    cargo: string;
    pessoa_fisica_id: number;
    situacao: string;

    constructor(personId: number, position: string, situation: string, ) {
        this.cargo = position;
        this.pessoa_fisica_id = personId;
        this.situacao = situation;
    }
}