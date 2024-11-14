export interface Transaction {
   id: number;
   amount: number;
   description: string;
   paymentType: string;
   status: string;
   created: Date;
   updated: Date;
   completed: Date;
   closed: Date;
   updatedBalance: number;
   memberId: number;
   invoiceId: number;
   paymentId: number;
}