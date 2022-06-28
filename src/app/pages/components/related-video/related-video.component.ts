import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../../models/video';

@Component({
  selector: 'app-related-video',
  templateUrl: './related-video.component.html',
  styleUrls: ['./related-video.component.css']
})
export class RelatedVideoComponent implements OnInit {
  @Input() videos: Video[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickItem(item: Video) {
    this.router.navigateByUrl('/youtube/watch/' + item.id.videoId);
  }
}
