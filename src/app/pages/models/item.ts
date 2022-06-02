import { Image } from './image';

export class Item {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    localized: any;
    publishedAt: string;
    tags: any;
    thumbnails: {
      default: Image;
      high: Image;
      maxres: Image;
      medium: Image;
      standard: Image;
    };
    title: string;
  };
  statistics: {
    commentCount: number;
    dislikeCount: number;
    favoriteCount: number;
    likeCount: number;
    viewCount: number;
  };

  constructor(
    etag: string,
    id: string,
    kind: string,
    snippet: {
      categoryId: string;
      channelId: string;
      channelTitle: string;
      description: string;
      liveBroadcastContent: string;
      localized: any;
      publishedAt: string;
      tags: any;
      thumbnails: {
        default: Image;
        high: Image;
        maxres: Image;
        medium: Image;
        standard: Image;
      };
      title: string;
    },
    statistics: {
      commentCount: number;
      dislikeCount: number;
      favoriteCount: number;
      likeCount: number;
      viewCount: number;
    }
  ) {
    this.etag = etag;
    this.id = id;
    this.kind = kind;
    this.snippet = snippet;
    this.statistics = statistics;
  }
}
