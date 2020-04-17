import { ApiProperty } from '@nestjs/swagger';

export class TournamentMasterDto {
  @ApiProperty ({ readOnly: true, required: false })
  tournamentId: number;
  @ApiProperty ({ readOnly: true, required: false })
  isActive: number | null;
  @ApiProperty ({ readOnly: true, required: false })
  createDate: Date | null;
  @ApiProperty ({ required: true})
  tournamentDescription: string | null;
  @ApiProperty ({ required: true})
  tournamentName: string | null;
  @ApiProperty ({ readOnly: true, required: false })
  updateDate: Date | null;
  @ApiProperty ({ required: true})
  year: string | null;
}
