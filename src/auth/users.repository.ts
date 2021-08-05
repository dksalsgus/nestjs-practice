import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // hash 암호화
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hasedPassword });
    try {
      await this.save(user);
    } catch (err) {
      console.log(err);
      if (err.code === 23505) {
        throw new ConflictException('User name already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
