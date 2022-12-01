import {UserType} from '../UserType';

export class BrokerUserResponse {
  userName: string;

  password: string;

  email: string;

  nrds: string;

  brokerCompanyName: string;

  phoneNumber: string;

  userType: UserType;

  errorMessage: string;
}
