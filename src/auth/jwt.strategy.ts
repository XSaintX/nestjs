import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { EntityRepository, Repository } from 'typeorm';
import { UserService } from './users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
      //secretOrKey: 'topSecret51',,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user  = await this.userService.getUser(username);
    console.log('DEBUG', user);
    //const user: User | null = await this.usersRepository.repo.findOne({ where: { username: username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}