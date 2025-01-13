import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class MainComponent implements OnInit {
  role: string = '';
  currentUser: { image: string; lastname: string; role: string } | null = null;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUserInfo();
    this.role = user?.role || '';
    this.currentUser = user
      ? { image: user.image || '/images/default-user.png', lastname: user.lastname, role: user.role }
      : null;
    console.log('User info:', this.currentUser);
  }

  navigateTo(route: string) {
    this.router.navigate(['/main', route]);
  }

  logout() {
    this.userService.setUserInfo(null); // Clear the shared user object
    this.router.navigate(['/login']); // Redirect to login page
  }

  getNavItems(): { label: string; route: string; icon: string }[] {
    const navItems = [
      { label: 'Home', route: 'home', icon: 'images/home.png' },
      { label: 'Courses', route: 'courses', icon: '/images/courses.png' },
      { label: 'Community', route: 'community', icon: '/images/workgroup.png' },
      { label: 'Profile', route: 'profile', icon: '/images/user-profile.png' },
      { label: 'News', route: 'news', icon: 'images/news.png' },
    ];

    if (this.role === 'teacher') {
      navItems.push({ label: 'Post', route: 'post', icon: '/images/book-plus.png' });
    }

    return navItems;
  }
}