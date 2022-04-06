import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MessageDeliveryService } from 'src/app/services/message-delivery.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.css']
})
export class ComprovanteComponent implements OnInit {

  inscription!: FormGroup

  hideButtons = false;

  inscriptionDate!: Date;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private notification: MessageDeliveryService,
              private router: Router,
              private serverConnection: ServerConnectionService) { }

  ngOnInit(): void {
    this.initiateForm();
    let inscriptionId = this.getUrlParameter();

    this.serverConnection.getInscriptionById(inscriptionId).subscribe((result) => {
      if (result.body != null) {
        let objectsReturn = Object.values(result.body);
        console.log(objectsReturn);
        this.inscription.controls['position'].setValue(objectsReturn[2]);
        this.inscription.controls['inscription'].setValue(inscriptionId);
        this.inscription.controls['situation'].setValue(objectsReturn[3]);
        this.inscriptionDate = new Date(objectsReturn[4]);
        //this.inscription.controls['date'].setValue(objectsReturn[4]);
        this.getPersonInfo(Number(objectsReturn[1]));
      }
    });
  }

  delay(ms: number): Promise<void> {
    return new Promise( resolve =>
      setTimeout(resolve, ms)
    );
  }

  initiateForm(): void {
    this.inscription = this.formBuilder.group({
      name: new FormControl(''),
      address: new FormControl(''),
      cpf: new FormControl(''),
      position: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      inscription: new FormControl(''),
      situation: new FormControl(''),
      date: new FormControl('')
    });
  }

  getUrlParameter(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getPersonInfo(personId: number): void {
    this.serverConnection.getPersonById(personId).subscribe((result) => {
      if (result.body != null) {
        let objectsReturn = Object.values(result.body);
        this.inscription.controls['name'].setValue(objectsReturn[1]);
        this.inscription.controls['cpf'].setValue(objectsReturn[2]);
        this.inscription.controls['address'].setValue(objectsReturn[3]);
        this.getStateInfo(Number(objectsReturn[5]));
        this.getCityInfo(Number(objectsReturn[4]));
      }
    })
  }

  getStateInfo(stateId: number): void {
    this.serverConnection.getStateById(stateId).subscribe((result) => {
      if (result.body != null) {
        let objectsReturn = Object.values(result.body);
        this.inscription.controls['state'].setValue(objectsReturn[1]);
      }
    })
  }

  getCityInfo(cityId: number): void {
    this.serverConnection.getCityById(cityId).subscribe((result) => {
      if (result.body != null) {
        let objectsReturn = Object.values(result.body);
        this.inscription.controls['city'].setValue(objectsReturn[2]);
      }
    })
  }

  async printPage(): Promise<void> {
    this.hideButtons = true;
    await this.delay(100);
    window.print();
    this.hideButtons = false;
  }

  goBackHomePage(): void {
    this.router.navigateByUrl('');
  }

}
