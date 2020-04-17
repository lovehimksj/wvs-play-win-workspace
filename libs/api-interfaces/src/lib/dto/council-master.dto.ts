import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CouncilMasterDto {
  @ApiProperty ({ readOnly: true, required: false })
  councilId: number;
  @IsNotEmpty ({ message: 'Game Description is required' })
  @ApiProperty ({ required: true })
  councilDescription: string;
  @IsNotEmpty ({ message: 'Game Description is required' })
  @ApiProperty ({ required: true })
  gameId: number;
  @IsNotEmpty ({ message: 'Game Description is required' })
  @ApiProperty ({ required: true })
  councilName: string;
}
