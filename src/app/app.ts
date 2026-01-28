import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {  
  protected readonly title = signal('empkeweb');

  constructor(protected auth: AuthService) {}

  logout() {
    this.auth.logout()
  }
}
