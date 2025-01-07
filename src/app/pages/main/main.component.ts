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

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUserInfo();
    this.role = user?.role || '';
    console.log('User info:', user);
  }

  navigateTo(route: string) {
    this.router.navigate(['/main', route]); // Navigate to child route
  }

  /**
   * Generate navigation items based on the user's role.
   */
  getNavItems(): { label: string; route: string; icon: string }[] {
    const navItems = [
      { label: 'Home', route: 'home', icon: 'images/home.png' },
      { label: 'Courses', route: 'courses', icon: '/images/courses.png' },
      { label: 'Community', route: 'community', icon: '/images/community.png' },
      { label: 'Profile', route: 'profile', icon: '/images/profile.png' },
      { label: 'News', route: 'news', icon: 'images/news.png' },
    ];

    // Add the "Post" navigation item only if the user is a teacher.
    if (this.role === 'teacher') {
      navItems.push({ label: 'Post', route: 'post', icon: '/images/post.png' });
    }

    return navItems;
  }
}