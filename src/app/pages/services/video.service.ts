import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private url = 'https://www.googleapis.com/youtube/v3/';
  private key = 'AIzaSyA0KNS1PgNmqQa-09bngllGCG_brwHfT6s';

  constructor(private http: HttpClient) {}

  getVideos(
    keySearch: string,
    order: string,
    maxResults: string,
    pageToken: string
  ) {
    return this.http.get(this.url + 'search', {
      params: {
        part: 'snippet',
        q: keySearch,
        key: this.key,
        maxResults: maxResults,
        type: 'video',
        order: order,
        pageToken: pageToken,
      },
    });
  }

  getVideoById(id: string) {
    return this.http.get(this.url + 'videos', {
      params: {
        part: 'snippet,statistics',
        id: id,
        key: this.key,
      },
    });
  }

  getRelatedToVideo(id: string, maxResults: string) {
    return this.http.get(this.url + 'search', {
      params: {
        part: 'snippet',
        relatedToVideoId: id,
        type: 'video',
        key: this.key,
        maxResults: maxResults,
      },
    });
  }

  getComment(id: string, maxResults: string) {
    return this.http.get(this.url + 'commentThreads', {
      params: {
        key: this.key,
        textFormat: 'plainText',
        part: 'snippet',
        videoId: id,
        maxResults: maxResults,
      },
    });
  }
}
