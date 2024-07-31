export interface BorrowRecord {
     id: number;
     bookId: number;
     borrowerName: string;
     borrowDate: Date | boolean;
     returnDate: Date | null;
}