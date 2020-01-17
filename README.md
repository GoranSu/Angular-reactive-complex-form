# angular-wergzb: [Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-wergzb)

This app demonstrates a reactive form that handles a complex object with nested arrays.
Object example: 

export class Contact {
  guid?: string;
  isActive?: boolean;
  balance?: string;
  picture?: string;
  age?: string;
  eyeColor?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: Address[] = [];
  about?: string;
}

export class Address {
  id?: string;
  streetNumber?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  telephone?: Telephone[] = [];
}

export class Telephone {
  id?: string;
  number?: string;
}
