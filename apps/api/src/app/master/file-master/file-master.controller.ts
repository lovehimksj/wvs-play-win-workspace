import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseModel } from '@wvs-play-win-workspace/api-interfaces';

@ApiTags('File Master Module')
@Controller('file')
export class FileMasterController {
  @Get('avatar')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  readFile(@Query('imageName') imageName: string, @Res() res) {
    return res.sendFile(imageName, { root: './files/' });
  }
}
