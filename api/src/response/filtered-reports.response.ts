import { ReportEntity } from 'src/entities/report.entity';

export class FilteredReportsResponse {
  data: {
    data: ReportEntity[];
  };
}
