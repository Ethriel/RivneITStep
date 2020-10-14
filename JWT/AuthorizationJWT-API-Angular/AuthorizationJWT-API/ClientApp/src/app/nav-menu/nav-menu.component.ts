import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth-service/auth-service.';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isSignedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotifierService) {

  }

  ngOnInit() {
    this.isSignedIn = false;
    this.authService.refreshIsSignedIn.subscribe((value: boolean) => {
      this.isSignedIn = value;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signOut(): void {
    this.authService.signOut();
    this.notify.notify("success", "Sign out successfully!")
    this.router.navigate(['']);
  }
}
