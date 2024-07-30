import { Contact } from "./contact";
import { ContactManager } from "./contactManager";

const contactManager = new ContactManager();

contactManager.addContact('Wan1', 12345678, 'wan1@gmail.com');
console.log('New contact has been added');

contactManager.addContact('Wan2', 12345678, 'wan2@gmail.com');
console.log('New contact has been added');

contactManager.addContact('Wan3', 12345678, 'wan3@gmail.com');
console.log('New contact has been added');

contactManager.addContact('Wan4', 12345678, 'wan4@gmail.com');
console.log('New contact has been added');

contactManager.addContact('Wan5', 12345678, 'wan5@gmail.com');
console.log('New contact has been added');

console.log("Full contact list");
console.log(contactManager.listContacts());

contactManager.removeContact(2);
console.log('Contact name: Wan2 has been deleted');

console.log("Full contact list");
console.log(contactManager.listContacts());

contactManager.updateContact(3, '', 456789);
contactManager.updateContact(4, 'Wan_4');
contactManager.updateContact(5, 'Wan_5', 91234567);

console.log("Full contact list");
console.log(contactManager.listContacts());