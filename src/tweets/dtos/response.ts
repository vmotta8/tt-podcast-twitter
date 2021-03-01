export class TweetResponse {
  created_at: string;
  id: number;
  id_str: string;
  full_text: string;
  truncated: any;
  display_text_range: any;
  entities: any;
  source: any;
  in_reply_to_status_id: any;
  in_reply_to_status_id_str: any;
  in_reply_to_user_id: any;
  in_reply_to_user_id_str: any;
  in_reply_to_screen_name: any;
  user: {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: any;
    description: any;
    url: any;
    entities: any;
    protected: any;
    followers_count: any;
    friends_count: any;
    listed_count: any;
    created_at: any;
    favourites_count: any;
    utc_offset: any;
    time_zone: any;
    geo_enabled: any;
    verified: any;
    statuses_count: any;
    lang: any;
    contributors_enabled: any;
    is_translator: any;
    is_translation_enabled: any;
    profile_background_color: any;
    profile_background_image_url: any;
    profile_background_image_url_https: any;
    profile_background_tile: any;
    profile_image_url: any;
    profile_image_url_https: any;
    profile_banner_url: any;
    profile_link_color: any;
    profile_sidebar_border_color: any;
    profile_sidebar_fill_color: any;
    profile_text_color: any;
    profile_use_background_image: any;
    has_extended_profile: any;
    default_profile: any;
    default_profile_image: any;
    following: any;
    follow_request_sent: any;
    notifications: any;
    translator_type: any;
  };
  geo: any;
  coordinates: any;
  place: any;
  contributors: any;
  is_quote_status: any;
  retweet_count: number;
  favorite_count: number;
  favorited: any;
  retweeted: any;
  possibly_sensitive: any;
  lang: any;
}