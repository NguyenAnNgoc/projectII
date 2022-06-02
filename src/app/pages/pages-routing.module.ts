import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailVideoComponent } from './components/detail-video/detail-video.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';

const routes: Routes = [
{ path: '', component: HomePageComponent},
{ path: 'search/:key',component: ListVideosComponent},
{ path: 'watch/:id', component: DetailVideoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
