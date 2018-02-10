// These objects will be saved as the same objects in Firestore
// We can assign multiple roles to a single user with this schema
export interface Roles {    // Privileges associated with each role
    subscriber?: boolean;   // Read 
    editor?: boolean;       // Read and Update
    admin?: boolean;        // Read, Update, Create, and Delete
    volunteer?: boolean;
    nonprofit?: boolean;
 }
  
export interface User {
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles;
    uid: string;
    filterOptions?: Object;
    nonProfitName?: string;
    nonProfitDescription?: string;
    nonProfitAddress?: string;
    nonProfitCity?: string;
    nonProfitState?: string;
    nonProfitZipCode?: string;
    nonProfitWebURL?: string;
    phoneNumber?: string;
}