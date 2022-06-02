import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public videos: Video[] = [];
  public channel = {};
  public p: number = 1;
  public type = '';
  public maxResults = 50;
  public value = {
    items: [],
  };
  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVideos('relevance');
  }

  getVideos(type: string) {
    this.type = type;
    return this.activatedRoute.params.subscribe((param) => {
      this.videoService
        .getVideos(param['key'], this.type, this.maxResults.toString())
        .subscribe((result) => {
          this.value = { ...this.value, ...result };
          this.videos = this.value.items;
        });
    });
  }

  onClickItem(video: Video) {
    this.router.navigateByUrl('/youtube/watch/' + video.id.videoId);
  }

  onClickPage() {
    this.maxResults += 7;
    this.getVideos(this.type);
  }
}
