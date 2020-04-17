/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { ApiProperty } from '@nestjs/swagger';

export class PlayerMasterDto {
  @ApiProperty ({readOnly:true, required: false })
  playerId: number;

  @ApiProperty({required: true })
  creditPoint: number | null;

  @ApiProperty({required: false })
  earnPoint: number | null;

  @ApiProperty({readOnly:true, required: false })
  gameId: number | null;

  @ApiProperty({required: false, readOnly:true })
  pictureFileName: string | null;

  @ApiProperty({required: true })
  playerDescription: string | null;

  @ApiProperty({required: true })
  playerName: string | null;

  @ApiProperty({required: true })
  playingNation: string | null;

  @ApiProperty({required: true })
  specialityId: number | null;

  @ApiProperty({required: false, readOnly: true })
  speciality: string | null;
}
