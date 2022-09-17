import { Test, TestingModule } from '@nestjs/testing';
import { FileMasterController } from './file-master.controller';

describe('FileMaster Controller', () => {
  let controller: FileMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileMasterController],
    }).compile();

    controller = module.get<FileMasterController>(FileMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
