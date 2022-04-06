import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../material-module';

import { InscricaoComponent } from './inscricao/inscricao.component';
import { ComprovanteComponent } from './comprovante/comprovante.component';

const routes: Routes = [
  { path: '', component: InscricaoComponent },
  { path: ':id', component: ComprovanteComponent }
]

@NgModule({
  declarations: [
    InscricaoComponent,
    ComprovanteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class InscricaoModule { }
