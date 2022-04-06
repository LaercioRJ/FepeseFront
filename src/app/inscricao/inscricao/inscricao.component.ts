import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/classes/Person';

import { MessageDeliveryService } from 'src/app/services/message-delivery.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

import { City } from '../../classes/City';
import { State } from '../../classes/State';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit {

  states: State[] = [];

  cities: City[] = [];

  inscription!: FormGroup
  cpf!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private notification: MessageDeliveryService,
              private router: Router,
              private serverConnection: ServerConnectionService) { }

  ngOnInit(): void {
    this.inscription = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z` ]*')]),
      address: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]{11}')]),
      position: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])
    });

    this.cpf = this.formBuilder.group({
      
    });

    this.loadStates();
  }

  loadStates(): void {
    this.serverConnection.listStates().subscribe((result) => {
      if (result.body != null) {
        let objetcsReturn = Object.values(result.body);
        for (let i = 0; i < objetcsReturn.length; i++) {
          let state = new State(objetcsReturn[i].nome, objetcsReturn[i].sigla);
          state.estado_id = objetcsReturn[i].estado_id;
          this.states.push(state);
        }
      }
    })
  }

  selectState(): void {
    const stateId = this.inscription.controls['state'].value;
    this.retrieveCities(stateId);
  }

  retrieveCities(stateId: number): void {
    this.serverConnection.listCitiesFromState(stateId).subscribe((result) => {
      if (result.body != null) {
        this.cities = [];
        this.inscription.controls['city'].setValue('');
        let objectsReturn = Object.values(result.body);
        for (let i = 0; i < objectsReturn.length; i++) {
          let city = new City(objectsReturn[i].nome, objectsReturn[i].estado_id);
          city.cidade_id = objectsReturn[i].cidade_id;
          this.cities.push(city);
        }
      }
    });
  }

  processNameField(name: string): string {
    let alteredName = '';
    for (let i = 0; i < name.length; i++) {
      if ((i == 0) && (name[i] != '')) {
        alteredName = alteredName + name[i].toUpperCase();
      } else {
        if ((name[i] != '') && ((name[i - 1] == ' ') || (name[i - 1] == '`'))) {
          alteredName = alteredName + name[i].toUpperCase();
        } else {
          alteredName = alteredName + name[i].toLowerCase();
        }
      }
    }
    return alteredName;
  }

  submit(): void {
    const cpf = this.inscription.controls['cpf'].value;
    this.serverConnection.getPersonByCpf(cpf).subscribe((result) => {
      if (result.body != null) {
        const object = Object.values(result.body);
        this.verifyIfPersonIsRegistered(object[0].id);
      }
    }, error => {
      if (error.status == 404) {
        this.createNewPersonAndInscription(cpf);
      } else {
        this.notification.showMessage('Houve um problema ao contactar o servidor.', 2500);
      }
    })
  }

  verifyIfPersonIsRegistered(id: number): void {
    const cargo = this.inscription.controls['position'].value;

    this.serverConnection.verifyIfPersonIsRegisteredInPosition(id, cargo).subscribe((result) => {
      console.log(result);
      this.notification.showMessage('Sinto muito, porém esse CPF já foi inscrito nesse concurso.', 3500);
    }, error => {
      console.log(error);
      this.createInscription(id);
    })
  }

  createNewPersonAndInscription(cpf: number): void {
    const name = this.processNameField(this.inscription.controls['name'].value);
    const address = this.inscription.controls['address'].value;
    const cityId = this.inscription.controls['city'].value;
    const stateId = this.inscription.controls['state'].value;

    let person = new Person(name, cpf, address, stateId, cityId);

    this.serverConnection.insertPerson(person).subscribe((result) => {
      if (result.body != null) {
        this.createInscription(Number(result.body));
      }
    })
  }

  createInscription(personId: number): void {
    console.log(personId);
    const cargo = this.inscription.controls['position'].value;

    this.serverConnection.insertInscription(personId, cargo).subscribe((result) => {
      if (result.body != null) {
        console.log(result.body);
        if (result.status == 200) {
          this.notification.showMessage('Inscrição realizada com sucesso!', 3000);
          this.router.navigateByUrl(String(result.body));
        }
      }
    });
  }

}
