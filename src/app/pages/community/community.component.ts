import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  standalone: true,
  imports: [CommonModule], // Import CommonModule for directives like *ngFor
})
export class CommunityComponent {
  users$ = new BehaviorSubject<any[]>([]); // Observable to hold user data

  // Fetch all users from the backend via GraphQL
  async fetchUsers() {
    const query = `
      query GetAllUsers {
        getAllUsers {
          id
          firstname
          lastname
          email
          phone
          address
          linkdin
          role
          image
        }
      }
    `;

    try {
      const response = await axios.post('http://localhost:9103/graphql', {
        query: query,
      });
      this.users$.next(response.data.data.getAllUsers); // Update users observable with fetched data
      console.log('Fetched users:', this.users$.value);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  ngOnInit(): void {
    // Fetch users when the component initializes
    this.fetchUsers();
  }
}
