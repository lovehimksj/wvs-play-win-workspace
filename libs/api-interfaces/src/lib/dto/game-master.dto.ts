/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GameMasterDto {
  @ApiProperty ({ readOnly: true, required: false })
  gameId: number;
  @IsNotEmpty ({ message: 'Game Description is required' })
  @ApiProperty ({ required: true })
  gameDescription: string;
  @IsNotEmpty ({ message: 'Game Name is required' })
  @ApiProperty ({ required: true })
  gameName: string;
}
