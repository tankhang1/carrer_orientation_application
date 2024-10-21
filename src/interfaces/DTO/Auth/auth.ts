import {IResponse} from '..';
export interface IAnnonymousToken {
  token: string;
}
export interface IAnnonymousTokenResponse extends IResponse {
  data: IAnnonymousToken;
}
