import {RealtorTransactionDetailsRequest} from './RealtorTransactionDetailsRequest';
import {RealtorDisbursementRequest} from './RealtorDisbursementRequest';
import {BrokerDisbursementRequest} from './BrokerDisbursementRequest';

export class CreateRealtorTransactionRequest {
  realtorEmail: string;

  transactionDetails: RealtorTransactionDetailsRequest ;

  realtorDisbursementList: Array<RealtorDisbursementRequest>;

  brokerDisbursementList: Array<BrokerDisbursementRequest>;

  commissionBreakdown: string;
}
