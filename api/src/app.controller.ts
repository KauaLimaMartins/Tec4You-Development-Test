import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RegionEntity } from './entities/region.entity';
import { ReportEntity } from './entities/report.entity';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/regions')
  getAllRegions(): Promise<{ regions: RegionEntity[] }> {
    return this.appService.getAllRegions();
  }

  @Get('/reports')
  getGlobalReports(): Promise<{ reports: ReportEntity }> {
    return this.appService.getGlobalReports();
  }

  @Get('/reports/filtered')
  getFilteredReports(
    @Query('date') date: string,
    @Query('region-iso') iso: string,
  ) {
    return this.appService.getFilteredReports(date, iso);
  }
}
