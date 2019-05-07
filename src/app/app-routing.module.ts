import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemComponent } from './item/item.component';
import { CorpusComponent } from './corpus/corpus.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: 'train', component: ItemComponent },
  { path: 'corpus', component: CorpusComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: '/train', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
