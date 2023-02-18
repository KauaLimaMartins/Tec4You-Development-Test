import { ReportEntity } from '../entities/report.entity';

export class FilteredReportsResponse {
  data: {
    data: ReportEntity[];
  };
}
