import { Book } from "../models/book";

export class BookService {
     private books: Book[] = [];
     private nextId: number = 1;

     addBook(title: string, authorId: number): Book{
          let newBook: Book = { id: this.nextId++, title: title, authorId: authorId, isBorrrowed: false };
          this.books.push(newBook);

          return newBook;
     }

     removeBook(id: number): boolean{
          let toRemoveBookIndex = this.books.findIndex(book => book.id === id);

          if(toRemoveBookIndex !== -1){
               this.books.splice(toRemoveBookIndex, 1);

               return true;
          }

          return false
     }

     listBook(): Book[]{
          return this.books;
     }

     updateBookStatus(id: number, borrow: boolean): boolean{
          let book = this.books.find(b => b.id === id);

          if(book && book.isBorrrowed !== borrow){
               book.isBorrrowed = borrow;

               return true;
          }

          return false;
     }
}