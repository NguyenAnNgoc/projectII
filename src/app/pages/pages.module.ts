import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { VideoService } from './services/video.service';
import { HttpClientModule } from '@angular/common/http';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { DetailVideoComponent } from './components/detail-video/detail-video.component';

@NgModule({
  declarations: [HomePageComponent, SearchComponent, ListVideosComponent, DetailVideoComponent],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule,FormsModule],
  exports: [SearchComponent],
  providers: [VideoService],
})
export class PagesModule {}
