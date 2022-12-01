export class BrokerTransactionVerificationApproval {

  constructor(brokerEmail: string, transactionId: string) {
    this.brokerEmail = brokerEmail;
    this.transactionId = transactionId;
  }

  brokerEmail: string;

  transactionId: string;
}
