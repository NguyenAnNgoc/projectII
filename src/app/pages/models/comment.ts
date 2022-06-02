export interface Comment {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    canReply: boolean;
    isPublic: boolean;
    topLevelComment: {
      etag: string;
      id: string;
      kind: string;
      snippet: {
        authorChannelId: { value: string };
        authorChannelUrl: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        canRate: boolean;
        likeCount: number;
        publishedAt: string;
        textDisplay: string;
        textOriginal: string;
        updatedAt: string;
        videoId: string;
        viewerRating: string;
      };
      totalReplyCount: number;
      videoId: string;
    };
  };
}
