export class MatchMasterDto {
  matchId: number;
  isActive: number | null;
  createDate: Date | null;
  matchDate: Date | null;
  matchDese: string | null;
  matchName: string | null;
  status: string | null;
  teamOneId: number | null;
  teamTwoId: number | null;
  updateDate: Date | null;
  venue: string | null;
  constructor() {}
}
