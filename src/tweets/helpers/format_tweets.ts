import { TweetResponse } from '../dtos/response';
import { TweetData } from '../dtos/tweet';

export const TweetsHelper = {
  rtFilter(tweets: TweetResponse[]): TweetResponse[] {
    tweets = tweets.filter((tweet) => {
      const text = tweet.full_text;
      const mentions = text.slice(0, 4);
      const threads = text.slice(0, 1);

      if (mentions != 'RT @') {
        if (threads != '@') {
          return tweet;
        }
      }
    });

    return tweets;
  },

  dateFilter(tweets: TweetResponse[]): TweetResponse[] {
    tweets = tweets.filter((tweet) => {
      const dateNow = new Date().getDate();
      const dateYesterday = dateNow - 1;
      const dateTomorrow = dateNow + 1;

      const tweetDate = parseInt(tweet.created_at.split(' ')[2]);

      if (
        tweetDate == dateNow ||
        tweetDate == dateYesterday ||
        tweetDate == dateTomorrow
      ) {
        return tweet;
      }
    });

    return tweets;
  },

  sumTweets(tweets: TweetResponse[]): number {
    return Object.keys(tweets).length;
  },

  sumEngagement(tweets: TweetResponse[]): number {
    let usersEngagement = 0;
    for (const tweet of tweets) {
      usersEngagement += tweet.retweet_count + tweet.favorite_count;
    }

    return usersEngagement;
  },

  generateRelevanceIndex(
    tweet: TweetResponse,
    usersEngagement: number,
    usersAmountTweets: number,
  ): any {
    const userAverageEngagement = usersEngagement / usersAmountTweets;
    const tweetEngagement = tweet.retweet_count + tweet.favorite_count;

    const relevanceIndex = tweetEngagement / userAverageEngagement;

    return relevanceIndex;
  },

  extractTweetUrl(tweet: TweetResponse): string {
    return `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  },

  usefulTweets(
    tweets: TweetResponse[],
    engagement: number,
    amount: number,
  ): TweetData[] {
    const allUsefulTweets = [];
    for (const tweet of tweets) {
      const usefulTweet = {
        name: tweet.user.name,
        relevanceIndex: this.generateRelevanceIndex(tweet, engagement, amount),
        tweetUrl: this.extractTweetUrl(tweet),
        text: tweet.full_text,
      };

      allUsefulTweets.push(usefulTweet);
    }

    return allUsefulTweets;
  },
};
