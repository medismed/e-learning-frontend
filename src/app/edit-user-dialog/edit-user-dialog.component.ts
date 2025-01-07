import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EditUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      firstname: [data.firstname, Validators.required],
      lastname: [data.lastname, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      address: [data.address, Validators.required],
      linkdin: [data.linkdin],
      password: [data.password, Validators.required],
      image:[data.image]
    });
  }

  async save() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;

      const mutation = `
        mutation UpdateUser($user: UserInput!, $id: ID!) {
          updateUser(user: $user, id: $id) {
            id
            firstname
            lastname
            email
            phone
            address
            linkdin
            image
          }
        }
      `;

      const variables = {
        user: updatedUser,
        id: this.data.id, // Pass the user's ID from the dialog data
      };

      try {
        const response = await axios.post('http://localhost:9103/graphql', {
          query: mutation,
          variables: variables,
        });
        console.log('User updated successfully:', response.data);
        this.dialogRef.close(updatedUser); // Close dialog with updated data
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  cancel() {
    this.dialogRef.close(); // Close dialog without saving
  }
}
