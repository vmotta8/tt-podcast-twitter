// eslint-disable-next-line @typescript-eslint/no-var-requires
const Twitter = require('twitter');
import { Injectable } from '@nestjs/common';
import { Group } from './dtos/group';
import { Tweet } from './dtos/tweet';
import { TweetsHelper } from './helpers/format_tweets';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TweetsService {
  private client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  async getTweets(groups: Group[]): Promise<Tweet[]> {
    const all = [];
    let allTweets = [];
    const userGroup = {};

    for (const group of groups) {
      const users = group.users;

      for (const user of users) {
        try {
          let tweets = await this.client.get('statuses/user_timeline', {
            screen_name: user,
            count: 200,
            tweet_mode: 'extended',
            include_entities: 1,
            include_extended_entities: 1,
          });

          tweets = TweetsHelper.rtFilter(tweets);
          const amount = TweetsHelper.sumTweets(tweets);
          const engagement = TweetsHelper.sumEngagement(tweets);
          tweets = TweetsHelper.dateFilter(tweets);

          tweets = TweetsHelper.usefulTweets(tweets, engagement, amount);

          allTweets = allTweets.concat(tweets);
        } catch (err) {
          console.log(user);
          console.log(err);
        }
      }

      allTweets.sort(
        (a, b) => parseFloat(b.relevanceIndex) - parseFloat(a.relevanceIndex),
      );
      allTweets = allTweets.slice(0, 10);

      userGroup['name'] = group.name;
      userGroup['email'] = group.email;
      userGroup['data'] = allTweets;

      all.push(userGroup);
      allTweets = [];
    }

    return all;
  }
}
