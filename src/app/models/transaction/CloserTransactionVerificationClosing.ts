export class CloserTransactionVerificationClosing {

  constructor(closerEmail: string, transactionId: string) {
    this.closerEmail = closerEmail;
    this.transactionId = transactionId;
  }

   closerEmail: string;

   transactionId: string;
}
