export class Tweet {
  name: string;
  email: string;
  data: TweetData[];
}

export interface TweetData {
  name: string;
  relevanceIndex: number;
  tweetUrl: string;
  text: string;
}
