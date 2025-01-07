import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  address: string = '';
  linkdin: string = '';
  role: string = '';
  image: string = '';

  // GraphQL endpoint
  private graphqlUrl = 'http://localhost:9103/graphql';

  // Method to handle form submission
  async onSubmit() {
    const mutation = `
      mutation AddUser($user: UserInput!) {
        addUser(user: $user) {
          id
          firstname
          lastname
          email
        }
      }
    `;

    const variables = {
      user: {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        linkdin: this.linkdin,
        role: this.role,
        image: this.image,
      },
    };

    try {
      const response = await axios.post(this.graphqlUrl, {
        query: mutation,
        variables: variables,
      });

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error) {

      console.log(error);
    }
  }
}
