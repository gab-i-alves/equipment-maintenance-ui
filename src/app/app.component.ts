import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
