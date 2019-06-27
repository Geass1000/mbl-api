import * as Enums from '../shared/enums';
import * as Constants from '../shared/constants';
import * as Interfaces from '../interfaces/environment.interfaces';

export const environment: Interfaces.Environment = {
  mode: Enums.Environment.Development,
  port: Constants.defPort,
  natsUrl: 'nats://localhost:4222',
};
