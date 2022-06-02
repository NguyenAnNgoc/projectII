import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {
  public keySearch: string = '';
  public videos: Video[] = [];
  public channel = {};
  public p: number = 1;
  public type = '';
  public maxResults = 15;
  public pageToken = '';
  public value = {
    items: [],
    nextPageToken: '',
  };
  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.keySearch = this.activatedRoute.snapshot.params['key']
    this.getVideos('relevance');
  }

  getVideos(type: string) {
    this.type = type;
    return this.activatedRoute.params.subscribe((param) => {
      this.videoService
        .getVideos(
          param['key'],
          this.type,
          this.maxResults.toString(),
          this.pageToken.toString()
        )
        .subscribe((result) => {
          this.value = { ...this.value, ...result };
          this.videos = [...this.videos, ...this.value.items];
        });
    });
  }

  onClickItem(video: Video) {
    this.router.navigateByUrl('/youtube/watch/' + video.id.videoId);
  }

  onClickPage() {
    this.pageToken = this.value.nextPageToken;
    this.getVideos(this.type);
  }

}
