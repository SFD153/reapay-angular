import {UserType} from '../UserType';

export class RealtorUserResponse {
  userName: string;

  company: string;

  email: string;

  phoneNumber: string;

  brokerName: string;

  noOrderBroker: number;

  nmls: string;

  managingBroker: string;

  brokerEmail: string;

  brokerPhoneNumber: string;

  closerCompany: string;

  noOrderCloser: number;

  closerName: string;

  closerEmail: string;

  closerPhoneNumber: string;

  emailValidation: boolean;

  userType: UserType;

  errorMessage: string;
}
