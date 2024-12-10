export class TokenData {
  public accessToken: string;
  public accessTokenExpirationTime: Date;
  public refreshToken: string;
  public refreshTokenExpirationTime: Date;

  public constructor(accessToken: string, accessTokenExpirationTime: Date, refreshToken: string, refreshTokenExpirationTime: Date) {
    this.accessToken = accessToken;
    this.accessTokenExpirationTime = accessTokenExpirationTime;
    this.refreshToken = refreshToken;
    this.refreshTokenExpirationTime = refreshTokenExpirationTime;
  }
}
