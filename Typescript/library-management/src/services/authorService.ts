import { Author } from "../models/author";

export class AuthorService {
     private nextId: number = 1;
     private authors: Author[] = [];

     addAuthor(name: string): Author{
          let newAuthor: Author = { id: this.nextId++, name: name };
          this.authors.push(newAuthor);

          return newAuthor;
     }

     removeAuthor(id: number): boolean{
          let toRemoveAuthorIndex: number = this.authors.findIndex(author => author.id === id);

          if(toRemoveAuthorIndex !== -1){
               this.authors.splice(toRemoveAuthorIndex, 1);

               return true;
          }

          return false
     }
     
     getAllAuthors(): Author[] {
          return this.authors;
     }
}