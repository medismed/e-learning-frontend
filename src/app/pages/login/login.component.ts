import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],

templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService , private router:Router){}

  async onSubmit() {

    try {
      const reponse = await axios.post('http://localhost:9103/auth/login', {
        email: 'user0@gmail.com',
        password: '1234',
      });
      console.log('the response is : ', reponse.data);
      if (reponse.status == 200){
        const userInfo = reponse.data;
         userInfo.image = `http://localhost:9103/upload/get-image?link=${userInfo.image}`;
         console.log("ther userInof with the new link of the image")
        this.userService.setUserInfo(userInfo);
        console.log("the user image link before updating : " , userInfo.image)
        this.router.navigate(['/main'])
      }
      else alert('Login failed!');
    } catch (error: any) {
      console.log("this the error : ",error)
    }
  }
}
