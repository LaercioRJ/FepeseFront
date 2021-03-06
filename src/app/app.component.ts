import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  title = 'concurso-front';

  goBackHomePage(): void {
    this.router.navigate(['']);
  }

  goLoginPage(): void {
    this.router.navigate(['meu_cadastro/login']);
  }
}
