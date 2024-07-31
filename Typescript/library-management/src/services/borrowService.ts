import { BorrowRecord } from "../models/borrowRecord";

export class BorrowService {
     private nextId: number = 1;
     private allBorrowRecords: BorrowRecord[] = [];

     checkBorrowBefore(bookId: number, borrowerName: string): boolean {
          return this.allBorrowRecords.some(record => record.bookId === bookId && record.borrowerName === borrowerName);
     }

     borrowBook(bookId: number, borrowerName: string): BorrowRecord | string {
          if(this.checkBorrowBefore(bookId, borrowerName)){
               return "This user has already borrowed this book.";
          }

          const newRecord: BorrowRecord = { id: this.nextId++, bookId: bookId, borrowerName: borrowerName, borrowDate: new Date(), returnDate: null };
          this.allBorrowRecords.push(newRecord);
          
          return newRecord;
     }

     returnBook(bookId: number, borrowerName: string): boolean {
          const returningBook = this.allBorrowRecords.find(record => record.bookId === bookId && record.borrowerName === borrowerName && !record.returnDate);

          if(returningBook){
               returningBook.returnDate = new Date();
               return true;
          }

          return false;
     }
}