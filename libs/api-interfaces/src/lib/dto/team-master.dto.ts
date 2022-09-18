/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { ApiProperty } from '@nestjs/swagger';

export class TeamMasterDto {
  @ApiProperty({ readOnly: true, required: false })
  teamId: number;
  @ApiProperty({ required: true })
  teamDescription: string | null;
  @ApiProperty({ required: true })
  teamName: string | null;
  @ApiProperty({ readOnly: true, required: false })
  teamIcon: string | null;
}
