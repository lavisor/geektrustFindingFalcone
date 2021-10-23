import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { FalconeResultComponent } from './falcone-result/falcone-result.component';

const routes: Routes = [
  { path: '', redirectTo: '/findfalcone', pathMatch: 'full' },
  { path: 'findfalcone', component: ContentComponent },
  { path: 'falconeresult', component: FalconeResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
