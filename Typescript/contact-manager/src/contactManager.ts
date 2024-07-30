import { Contact } from "./contact";

export class ContactManager {
     private contacts: Contact[] = [];
     private currentId: number = 1;
     
     addContact(name: string, phone_number: number, email: string): Contact {
          const contact: Contact = { id: this.currentId++, slug: name + "_1234", name: name, phone_number: phone_number, email: email };
          this.contacts.push(contact);

          return contact;
     }

     removeContact(id: number): boolean{
          const index = this.contacts.findIndex(c => c.id === id);

          if(index !== -1){
               this.contacts.splice(index, 1);
               return true;
          }
          return false;
     }

     updateContact(id: number, name?: string, phone_number?: number): boolean{
          const contact = this.contacts.find(c => c.id === id);

          if(contact){
               if(name !== undefined && name !== '' && !phone_number || name && !phone_number){
                    console.log('case name');
                    contact.name = name;
               }else if(phone_number !== undefined && !name || phone_number && !name){
                    console.log('case phone number');
                    contact.phone_number = phone_number
               }else if(name !== undefined && phone_number){
                    console.log('case both');
                    contact.name = name;
                    contact.phone_number = phone_number;
               }

               return true;
          }

          return false;
     }

     listContacts(): Contact[]{
          return this.contacts;
     }
}