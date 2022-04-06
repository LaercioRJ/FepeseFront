import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../classes/Person';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  constructor(private httpClient: HttpClient) { }

  private httpHeaders!: HttpHeaders;

  listStates(): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/estado';

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }

  listCitiesFromState(stateId: number): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/cidade/de_estado/'.concat(String(stateId));

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }

  getPersonByCpf(cpf: number): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/pessoa_fisica/by_cpf/'.concat(String(cpf));

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }

  insertPerson(person: Person): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/pessoa_fisica';

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.post(url, {
        nome: person.nome,
        cpf: person.cpf,
        endereco: person.endereco,
        cidade_id: person.cidade_id,
        estado_id: person.estado_id
      },
      {
        headers: this.httpHeaders,
        responseType: 'json',
        observe: 'response'
      });
  }

  verifyIfPersonIsRegisteredInPosition(personId: number, position: string): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/inscricao/by_cargo_pessoa';
    console.log(personId);
    console.log(position);

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.post(url, {
        pessoa_fisica_id: personId,
        cargo: position
      },
      {
        headers: this.httpHeaders,
        responseType: 'json',
        observe: 'response'
    });
  }

  insertInscription(personId: number, position: string): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/inscricao';

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.post(url, {
        pessoa_fisica_id: personId,
        cargo: position,
        situacao: 'enviado'
      },
      {
        headers: this.httpHeaders,
        responseType: 'json',
        observe: 'response'
      });
  }

  getInscriptionById(inscriptionId: number): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/inscricao/'.concat(String(inscriptionId));

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }

  getPersonById(personId: number): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/pessoa_fisica/'.concat(String(personId));

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }

  getStateById(stateId: number): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/estado/'.concat(String(stateId));

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }

  getCityById(cityId: number): Observable<HttpResponse<object>> {
    const url = 'http://127.0.0.1:8000/api/cidade/'.concat(String(cityId));

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.get(url, 
    {
      headers: this.httpHeaders,
      responseType: 'json',
      observe: 'response'
    });
  }
}
