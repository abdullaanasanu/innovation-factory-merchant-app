import { Test, TestingModule } from '@nestjs/testing';
import { PartnerServiceController } from './partner-service.controller';

describe('PartnerServiceController', () => {
  let controller: PartnerServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerServiceController],
    }).compile();

    controller = module.get<PartnerServiceController>(PartnerServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
