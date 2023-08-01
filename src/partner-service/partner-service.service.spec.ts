import { Test, TestingModule } from '@nestjs/testing';
import { PartnerServiceService } from './partner-service.service';

describe('PartnerServiceService', () => {
  let service: PartnerServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerServiceService],
    }).compile();

    service = module.get<PartnerServiceService>(PartnerServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
