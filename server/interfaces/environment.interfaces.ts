import * as Enums from '../shared/enums';

export interface Environment {
  mode: Enums.Environment;
  port: number;
  natsUrl: string;
}
