import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ManagementClient } from 'auth0';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

import { environment } from '../../../../environments/environment';
import { TUser } from '../../ts';

interface IAuthPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  private readonly managementClient: ManagementClient = new ManagementClient({
    domain: environment.auth0.domain,
    clientId: environment.auth0.clientId,
    clientSecret: environment.auth0.clientSecret,
    tokenProvider: { enableCache: true, cacheTTLInSeconds: 40 }
  });

  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: environment.auth0.jwksUri
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: environment.auth0.audience,
      issuer: environment.auth0.issuer,
      algorithms: ['RS256']
    });
  }

  public async validate(payload: IAuthPayload): Promise<TUser> {
    const { sub } = payload;

    const user = await this.managementClient.getUser({
      id: sub
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
