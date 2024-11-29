import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient} from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(), provideNgxMask()],
});
