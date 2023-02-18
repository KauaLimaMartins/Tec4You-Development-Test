import { RegionEntity } from '../entities/region.entity';

export class AllRegionsResponse {
  data: {
    data: RegionEntity[];
  };
}
