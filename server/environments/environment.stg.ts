import * as Enums from '../shared/enums';
import * as Constants from '../shared/constants';
import * as Interfaces from '../interfaces/environment.interfaces';

export const environment: Interfaces.Environment = {
  mode: Enums.Environment.Staging,
  port: +process.env.PORT || Constants.defPort,
  natsUrl: process.env.NATS_URL || 'nats://localhost:4222',
};
