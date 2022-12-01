export class BrokerDisbursementRequest {

  constructor(detailsPayment: string , receiverName: string, amount: string ) {
    this.detailsPayment = detailsPayment;
    this.receiverName = receiverName;
    this.amount = amount;
  }
  detailsPayment: string;

  receiverName: string;

  amount: string;
}
