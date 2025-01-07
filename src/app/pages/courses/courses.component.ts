import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: true,
  imports: [CommonModule], // Import CommonModule here
})
export class CoursesComponent {
  courses$ = new BehaviorSubject<any[]>([]); // Observable to hold course data

  // Fetch courses using GraphQL
  async fetchCourses() {
    const query = `
      query GetAllCourses {
        getAllCourses {
          id
          name
          description
          link
          teacherId
          teacherlastname
        }
      }
    `;

    try {
      const response = await axios.post('http://localhost:9103/graphql', {
        query: query,
      });
      
      this.courses$.next(response.data.data.getAllCourses);
      console.log('Fetched courses:', this.courses$.value);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  downloadFile(filePath: string) {
    const downloadUrl = `http://localhost:9103/upload/download?link=${encodeURIComponent(filePath)}`;
    window.location.href = downloadUrl;
  }

  ngOnInit(): void {
    this.fetchCourses();
  }
}
