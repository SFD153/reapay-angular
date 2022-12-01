import {StatusType} from '../StatusType';
import {RealtorTransactionDetailsResponse} from './RealtorTransactionDetailsResponse';
import {RealtorDisbursementResponse} from './RealtorDisbursementResponse';
import {BrokerDisbursementResponse} from './BrokerDisbursementResponse';

export class RealtorClosingTransactionResponse {

  transactionId: string;

  realtorEmail: string;

  brokerEmail: string;

  closerEmail: string;

  transactionDetails: RealtorTransactionDetailsResponse;

  realtorDisbursementList: Array<RealtorDisbursementResponse>;

  brokerDisbursementList: Array<BrokerDisbursementResponse>;

  commissionBreakdown: string;

  status: StatusType;

  transactionConfirmed: boolean;

  bucket: string;

  folder: string;

  pdfName: string;
}
