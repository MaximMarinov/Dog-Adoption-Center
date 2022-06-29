import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<User> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private isLoggingOut: boolean = false;

  constructor (
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleLogout() {

    if(this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args)
      },  
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/'])
      },
      error: () => {
        this.isLoggingOut = true;
      }
    });
  }
}
