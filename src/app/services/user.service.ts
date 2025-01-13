// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root', // This ensures the service is provided application-wide
// })
// export class UserService {


//   private userInfo: any = null; // Object to store user information

//   // Method to set user info
//   setUserInfo(user: any): void {
//     this.userInfo = user;
//   }

//   // Method to get user info
//   getUserInfo(): any {
//     return this.userInfo;
//   }

//   // Optional: Check if user is logged in
//   isLoggedIn(): boolean {
//     return this.userInfo !== null;
//   }

//   // Optional: Clear user info (logout)
//   clearUserInfo(): void {
//     this.userInfo = null;
//   }

//   getUserRole(): string {
//     return this.userInfo?.role || '';
//   }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This ensures the service is provided application-wide
})
export class UserService {
  private userInfo: any = null; // Object to store user information

  /**
   * Set the user information.
   * @param user The user object to be stored.
   */
  setUserInfo(user: any): void {
    this.userInfo = user;
  }

  /**
   * Get the current user information.
   * @returns The stored user object or null if not logged in.
   */
  getUserInfo(): any {
    return this.userInfo;
  }

  /**
   * Check if the user is logged in.
   * @returns True if the user information is available, otherwise false.
   */
  isLoggedIn(): boolean {
    return this.userInfo !== null;
  }

  /**
   * Clear the stored user information (used for logging out).
   */
  clearUserInfo(): void {
    this.userInfo = null;
  }

  /**
   * Get the current user's role.
   * @returns The role of the user or an empty string if not logged in.
   */
  getUserRole(): string {
    return this.userInfo?.role || '';
  }

  /**
   * Optional: Check if the user has a specific role.
   * @param role The role to check against.
   * @returns True if the user has the specified role, otherwise false.
   */
  hasRole(role: string): boolean {
    return this.userInfo?.role === role;
  }
}