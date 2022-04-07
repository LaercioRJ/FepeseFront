import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMyAccount(): void {
    this.router.navigateByUrl('meu_cadastro');
  }

  goToConcoursesPage(): void {
    this.router.navigateByUrl('concursos');
  }

  goToMyInscriptions(): void {
    this.router.navigateByUrl('minhas_inscricoes');
  }

  goToLocations(): void {
    this.router.navigateByUrl('locais');
  }

}
