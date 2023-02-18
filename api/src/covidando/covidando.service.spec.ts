import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CovidandoService } from './covidando.service';
import { RegionEntity } from './entities/region.entity';
import { ReportEntity } from './entities/report.entity';

const regionsCache: RegionEntity[] = [
  { iso: 'test1', name: 'test1' },
  { iso: 'test2', name: 'test2' },
  { iso: 'test3', name: 'test3' },
];

const reportCache: ReportEntity = {
  date: 'test',
  last_update: 'test',
  active: 0,
  confirmed: 0,
  deaths: 0,
  recovered: 0,
  fatality_rate: 0.0,
};

const mockedCacheService = {
  get: jest.fn(),
  set: jest.fn(),
};

const mockedHttpService = {
  get: jest.fn(),
};

jest.mock('rxjs', () => {
  return {
    firstValueFrom() {
      return {
        data: new Promise((resolve) => {
          resolve(true);

          return {};
        }),
      };
    },
    lastValueFrom() {
      return {
        data: regionsCache,
      };
    },
  };
});

describe('CovidandoService', () => {
  let covidandoService: CovidandoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        CovidandoService,
        {
          provide: CACHE_MANAGER,
          useValue: mockedCacheService,
        },
        {
          provide: HttpService,
          useValue: mockedHttpService,
        },
      ],
    }).compile();

    covidandoService = moduleRef.get<CovidandoService>(CovidandoService);
  });

  it('Should be defined', () => {
    expect(CovidandoService).toBeDefined();
  });

  it('Should get the regions from cache successfully', async () => {
    mockedCacheService.get.mockResolvedValue(regionsCache);

    const result = await covidandoService.getAllRegions();

    expect(result).toEqual({ regions: regionsCache });
  });

  it('Should get the global reports from cache successfully', async () => {
    mockedCacheService.get.mockResolvedValue(reportCache);

    const result = await covidandoService.getGlobalReports();

    expect(result).toEqual({ reports: reportCache });
  });

  it('Should get filtered reports from cache successfully', async () => {
    mockedCacheService.get.mockResolvedValue(reportCache);

    const result = await covidandoService.getFilteredReports(
      'test-date',
      'test-iso',
    );

    expect(result).toEqual({ reports: reportCache });
  });
});
