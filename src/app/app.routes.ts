import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CommunityComponent } from './pages/community/community.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewsComponent } from './pages/news/news.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'community', component: CommunityComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'news', component: NewsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'post', component: PostComponent }, // Add the PostComponent here


    ],
  },
];
