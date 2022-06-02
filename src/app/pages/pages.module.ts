import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { VideoService } from './services/video.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomePageComponent, SearchComponent],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule],
  exports: [SearchComponent],
  providers: [VideoService],
})
export class PagesModule {}
