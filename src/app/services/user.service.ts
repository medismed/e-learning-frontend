import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures the service is provided application-wide
})
export class UserService {


  private userInfo: any = null; // Object to store user information

  // Method to set user info
  setUserInfo(user: any): void {
    this.userInfo = user;
  }

  // Method to get user info
  getUserInfo(): any {
    return this.userInfo;
  }

  // Optional: Check if user is logged in
  isLoggedIn(): boolean {
    return this.userInfo !== null;
  }

  // Optional: Clear user info (logout)
  clearUserInfo(): void {
    this.userInfo = null;
  }

  getUserRole(): string {
    return this.userInfo?.role || '';
  }
}
