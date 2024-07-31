import { BorrowService } from './services/borrowService';

const borrowService = new BorrowService();

// Helper function to log test results
function logResult(description: string, result: any) {
    console.log(description);
    console.log(result);
    console.log('-------------------------');
}

// Test adding new borrow records
logResult("Adding new borrow record for Alice (bookId: 1)", borrowService.borrowBook(1, "Alice"));
logResult("Adding new borrow record for Bob (bookId: 2)", borrowService.borrowBook(2, "Bob"));

// Test trying to borrow the same book by the same user
logResult("Trying to borrow the same book by Alice again (bookId: 1)", borrowService.borrowBook(1, "Alice"));

// Test trying to borrow the same book by a different user
logResult("Trying to borrow the same book by Charlie (bookId: 1)", borrowService.borrowBook(1, "Charlie"));

// Test returning a book
logResult("Returning book borrowed by Alice (bookId: 1)", borrowService.returnBook(1, "Alice"));

// Test trying to return a book that hasn't been borrowed
logResult("Trying to return a book that hasn't been borrowed (bookId: 3 by Charlie)", borrowService.returnBook(3, "Charlie"));

// Test borrowing a book after it has been returned
logResult("Borrowing book by Alice again after return (bookId: 1)", borrowService.borrowBook(1, "Alice"));

// Test returning a book that has already been returned
logResult("Trying to return a book that has already been returned (bookId: 1 by Alice)", borrowService.returnBook(1, "Alice"));

// Test listing all borrow records
logResult("Listing all borrow records", borrowService['allBorrowRecords']);
