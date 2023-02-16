import { RegionEntity } from 'src/entities/region.entity';

export class AllProvincesResponse {
  data: {
    data: RegionEntity[];
  };
}
