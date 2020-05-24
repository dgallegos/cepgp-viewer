import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerListComponent } from './player-list/player-list.component';
import { TrafficComponent } from './traffic/traffic.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '',   component: PlayerListComponent }, // redirect to `first-component`
  { path: 'traffic', component: TrafficComponent },
  { path: 'upload', component: UploadComponent },
  { path: '**', component: PlayerListComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
