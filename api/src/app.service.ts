import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ReportEntity } from './entities/report.entity';
import { TotalReportsResponse } from './response/total-reports.response';
import { RegionEntity } from './entities/region.entity';
import { AllProvincesResponse } from './response/all-provinces.response';
import { FilteredReportsResponse } from './response/filtered-reports.response';
import { FilteredReportEntity } from './entities/filtered-report.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  async getAllRegions(): Promise<{ regions: RegionEntity[] }> {
    const cachedRegions = await this.cacheManager.get<RegionEntity[]>(
      'regions',
    );

    if (!cachedRegions) {
      const { data: responseData } = await firstValueFrom<AllProvincesResponse>(
        this.httpService.get('/regions'),
      );

      const { data } = responseData;

      await this.cacheManager.set('regions', data, {
        // 1 week
        ttl: 604800,
      });

      return { regions: data };
    }

    return { regions: cachedRegions };
  }

  async getGlobalReports(): Promise<{ reports: ReportEntity }> {
    const cachedGlobalReports = await this.cacheManager.get<ReportEntity>(
      'global-reports',
    );

    if (!cachedGlobalReports) {
      const { data: responseData } = await firstValueFrom<TotalReportsResponse>(
        this.httpService.get('/reports/total'),
      );

      const { data } = responseData;

      await this.cacheManager.set('global-reports', data, {
        // 1 Hour
        ttl: 3600,
      });

      return { reports: data };
    }

    return { reports: cachedGlobalReports };
  }

  async getFilteredReports(date: string, iso: string) {
    const cachedFiltered = await this.cacheManager.get<RegionEntity[]>(
      `filtered-${iso}-${date}`,
    );

    if (!cachedFiltered) {
      const { data: responseData } =
        await lastValueFrom<FilteredReportsResponse>(
          this.httpService.get('/reports', {
            params: { date, iso },
          }),
        );

      const { data } = responseData;

      let formattedReport: FilteredReportEntity = {
        date,
        active: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      };

      for (let i = 0; i < data.length; i++) {
        const currentReport: ReportEntity = data[i];

        formattedReport = {
          date,
          confirmed: formattedReport.confirmed + currentReport.confirmed,
          active: formattedReport.active + currentReport.active,
          deaths: formattedReport.deaths + currentReport.deaths,
          recovered: formattedReport.recovered + currentReport.recovered,
        };
      }

      await this.cacheManager.set(`filtered-${iso}-${date}`, formattedReport, {
        // 1 Hour
        ttl: 3600,
      });

      return { reports: formattedReport };
    }

    return { reports: cachedFiltered };
  }
}
