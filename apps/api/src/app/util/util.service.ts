import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
  constructor() {}

  static imageFileFilter = (req, file, callback) => {
    if (!file) return false;
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  static editFileName = (req, file, callback) => {
    if (!file) return false;
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hashSync(password, salt);
  }

  async getSalt(saltRounds): Promise<string> {
    return await bcrypt.genSalt(saltRounds);
  }

  async matchPassword(rawPassword, hash): Promise<boolean> {
    return await bcrypt.compareSync(rawPassword, hash);
  }
}
