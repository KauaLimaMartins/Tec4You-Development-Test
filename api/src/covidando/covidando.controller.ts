import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';

import { CovidandoService } from './covidando.service';
import { RegionEntity } from './entities/region.entity';
import { ReportEntity } from './entities/report.entity';

@UseInterceptors(CacheInterceptor)
@Controller('covidando')
export class CovidandoController {
  constructor(private readonly covidandoService: CovidandoService) {}

  @Get('regions')
  getAllRegions(): Promise<{ regions: RegionEntity[] }> {
    return this.covidandoService.getAllRegions();
  }

  @Get('reports')
  getGlobalReports(): Promise<{ reports: ReportEntity }> {
    return this.covidandoService.getGlobalReports();
  }

  @Get('reports/filtered')
  getFilteredReports(
    @Query('date') date: string,
    @Query('region-iso') iso: string,
  ) {
    return this.covidandoService.getFilteredReports(date, iso);
  }
}
