import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DocumentsComponent } from './documents/documents.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { HomeComponent } from './home/home.component';
import { VisorCommponent } from './visor/visor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'documents', component: DocumentsComponent},
  { path: 'documents/visor/:source/:name', component: VisorCommponent},
  { path: 'escritos', component: FormTemplateComponent}

];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }