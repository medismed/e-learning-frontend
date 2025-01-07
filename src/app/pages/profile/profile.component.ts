import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { EditUserDialogComponent } from '../../edit-user-dialog/edit-user-dialog.component';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  user: any = {
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    email: '',
    linkdin: '',
    image: '',
    role: '',
  };

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
  }

  editAll() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...this.user },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        console.log('Updated user data:', updatedData);
        this.user = updatedData;
        console.log('The data in the profile:', updatedData);
      }
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: Event) {

    console.log("we just select a iamge ")

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', this.userService.getUserInfo().id);

      try {
        const response = await axios.post(
          'http://localhost:9103/upload/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Image uploaded successfully:', response.data);
        console.log("the new user with teh new image link ")
        const updatedImageLink = `http://localhost:9103/upload/get-image?link=${response.data}`;
        this.user.image = updatedImageLink;
        console.log("ther user before set it to the userservie : " , this.user)

        // Update the UserService with the new user data
        this.userService.setUserInfo(this.user);

        console.log("the updatedImagelink :  "  , updatedImageLink)
        console.log("the userService :  "  , this.userService)

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
}
