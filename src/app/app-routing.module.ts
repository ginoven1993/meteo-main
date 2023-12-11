import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FristPageComponent } from './frist-page/frist-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

// const routes: Routes = [];
const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: FristPageComponent },
  { path: 'semaine', component: SecondPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
