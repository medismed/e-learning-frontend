import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Include FormsModule here
})
export class PostComponent implements OnInit {
  course = {
    name: '',
    description: '',
    teacherId: null,
    teacherlastname: '',
  };

  file: File | null = null;
  courses: any[] = []; // This will hold the uploaded courses
  uploadSuccess: boolean = false; // To show success message
  uploadedCourseName: string = ''; // Name of the last uploaded course

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userInfo = this.userService.getUserInfo();
    this.course.teacherId = userInfo.id; // Set teacherId from userService
    this.course.teacherlastname = userInfo.lastname; // Set teacherlastname
    console.log("User role from the post component: ", userInfo.role);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  async onSubmit(form: any): Promise<void> {
    if (!this.file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('course', JSON.stringify(this.course));

    try {
      const response = await axios.post(
        'http://localhost:9103/upload/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Course uploaded successfully:', response.data);

      // Show success message
      this.uploadSuccess = true;
      this.uploadedCourseName = this.course.name;

      // Add the uploaded course to the list of courses
      this.courses.push({ ...this.course, date: new Date() });

      // Reset the form and file
      form.reset();
      this.file = null;
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  }
}