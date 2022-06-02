import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.css']
})
export class DetailVideoComponent implements OnInit {

  public videos: Video[] = [];
  public item: any;
  public urlVideo: SafeResourceUrl;
  public maxResultsVideo = 22;
  public comment: Comment[] = [];
  public maxResultsComment = 15;
  public width: number = window.innerWidth / 1.89;
  public height: number = this.width / 1.5;
  public value = {
    items: [],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit() {
    this.getVideo()
    // this.getRelatedToVideo();
    // this.getComment();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?: any) {
      this.width = window.innerWidth / 1.9;
      this.height = this.width / 1.6;
    }

  getVideo() {
    return this.activatedRoute.params.subscribe(param => {
      this.videoService
        .getVideoById(param['id'])
        .subscribe((result) => {
          this.value = { ...this.value, ...result };
          this.item = this.value.items[0];
          this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' + this.item.id + '?autoplay=1'
          );
        });
    });
  }

  // getRelatedToVideo() {
  //   return this.activatedRoute.params.subscribe(param => {
  //     this.videoService
  //       .getRelatedToVideo(param.id, this.maxResultsVideo.toString())
  //       .subscribe((result: { items: any[] }) => {
  //         this.videos = result.items;
  //       });
  //   });
  // }

  onClickPage() {
    this.maxResultsVideo += 8;
    this.maxResultsComment += 10;
    // this.getRelatedToVideo();
    // this.getComment();
  }

  // getComment() {
  //   return this.activatedRoute.params.subscribe(param => {
  //     this.videoService.getComment(param.id, this.maxResultsComment.toString()).subscribe((result: {items: any[]}) => {
  //       this.comment = result.items;
  //     });
  //   });
  // }
}
