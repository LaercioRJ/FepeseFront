import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'inscrever', loadChildren: () => import('./inscricao/inscricao.module').then((m) => m.InscricaoModule) },
  { path: '', redirectTo: '/inscrever', pathMatch: 'full' },
  { path: 'meu_cadastro', loadChildren: () => import('./my-account/my-account.module').then((m) => m.MyAccountModule) },
  { path: 'minhas_inscricoes', loadChildren: () => import('./my-inscriptions/my-inscriptions.module').then((m) => m.MyInscriptionsModule) },
  { path: 'locais', loadChildren: () => import('./places/places.module').then((m) => m.PlacesModule) },
  { path: 'concursos', loadChildren: () => import('./concourses/concourses.module').then((m) => m.ConcoursesModule) },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
