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
  public maxResults = 30;
  public pageToken = '';
  public value = {
    items: [],
    nextPageToken: '',
  };
  public sortName: any;
  public arrangement: any;
  public backupVideos: Video[] = [];

  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

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
          this.backupVideos = JSON.parse(JSON.stringify(this.videos));
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

  getSortName(value: any) {
    this.sortName = value
  }

  getArrangement(value: any) {
    this.arrangement = value;
  }

  swapObject(arr: any, a: number, b: number) {
    let temp = JSON.parse(JSON.stringify(arr[a]));
    arr[a] = JSON.parse(JSON.stringify(arr[b]));
    arr[b] = JSON.parse(JSON.stringify(temp))
    return arr;
  }

  sort() {
    if (this.sortName && this.arrangement) {
      switch (this.arrangement) {
        case '1': console.time('selectionSort');
          this.selectionSort(this.videos);
          console.timeEnd('selectionSort')
          break;

        case '2': console.time('bubbleSort');
          this.bubbleSort(this.videos);
          console.timeEnd('bubbleSort')
          break;

        case '3': console.time('insertionSort');
          this.insertionSort(this.videos);
          console.timeEnd('insertionSort')
          break;

        case '4': console.time('quickSort');
          this.videos = this.quickSort(this.videos);
          console.timeEnd('quickSort')
          break;
      }
    } else {
      this.videos = JSON.parse(JSON.stringify(this.backupVideos))
    }
  }

  selectionSort(arr: any) {
    let currentValueNewIndex;
    for (let i = 0; i < arr.length; i++) {
      currentValueNewIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[currentValueNewIndex].snippet[this.sortName] > arr[j].snippet[this.sortName]) {
          currentValueNewIndex = j;
        }
      }

      if (i !== currentValueNewIndex) {
        this.swapObject(arr, i, currentValueNewIndex)
      }
    }
    return arr;
  }

  bubbleSort(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j].snippet[this.sortName] > arr[j + 1].snippet[this.sortName]) {
          this.swapObject(arr, j, j + 1)
        }
      }
    }
    return arr;
  };

  insertionSort(arr: any) {
    for (let i = 1; i < arr.length; i++) {
      // Choosing the first element in our unsorted subarray
      let current = JSON.parse(JSON.stringify(arr[i]));
      // The last element of our sorted subarray
      let j = i - 1;
      while ((j > -1) && (current.snippet[this.sortName] < arr[j].snippet[this.sortName])) {
        arr[j + 1] = JSON.parse(JSON.stringify(arr[j]));
        j--;
      }
      arr[j + 1] = JSON.parse(JSON.stringify(current));
    }
    return arr;
  }

  quickSort(arr: any): any[] {
    if (arr.length < 2) return arr;

    // *** lấy phần tử cuối của 'arr' làm 'pivot'
    const pivotIndex = arr.length - 1;
    const pivot = JSON.parse(JSON.stringify(arr[pivotIndex]));

    const left = [];
    const right = [];

    let currentItem;
    // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
    for (let i = 0; i < pivotIndex; i++) {
      currentItem = JSON.parse(JSON.stringify(arr[i]));

      if (currentItem.snippet[this.sortName] < pivot.snippet[this.sortName]) {
        left.push(currentItem);
      } else {
        right.push(currentItem);
      }
    }

    return this.quickSort(left).concat(pivot, this.quickSort(right));
  }
}
