// These objects will be saved as the same objects in Firestore
// We can assign multiple roles to a single user with this schema
export interface Roles {    // Privileges associated with each role
    subscriber?: boolean;   // Read 
    editor?: boolean;       // Read and Update
    admin?: boolean;        // Read, Update, Create, and Delete
 }
  
export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    roles: Roles;
}