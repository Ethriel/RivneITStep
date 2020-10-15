import { AuthService } from './../../services/auth-service/auth-service.';
import { SignInModel } from './../../models/sign-in.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: SignInModel = new SignInModel();

  constructor(
    private spinner: NgxSpinnerService,
    private notify: NotifierService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.spinner.show();
    this.notify.hideAll();

    if (!this.model.isValidEmail()) {
      this.notify.notify("error", "Please, enter email");
    }
    else if (!this.model.isValidPassword()) {
      this.notify.notify("error", "Please, enter password");
    }
    else if (!this.model.isEmail()) {
      this.notify.notify("error", "Please, enter a valid email");
    }
    else {
      this.authService.signIn(this.model).subscribe(data => {
        if (data.status === 200) {
          this.notify.notify("success", "Sign in was successful");
          this.authService.setToken(data.token);
          
          const decoded = jwt_decode<any>(data.token);
          this.authService.setRole(decoded.role);
          this.authService.switchMenu.emit(true);
          
          if (decoded.role === "Admin") {
            this.router.navigate(["admin"])
          }
          else if (decoded.role === "User") {
            this.router.navigate(["user"])
          }
        }
        else {
          this.notify.notify("error", data.message);
          for (let error of data.errors) {
            this.notify.notify("error", error);
          }
        }
      });
    }

    setTimeout(() => {
      this.hideSpinner();
    }, 1000);
  }

  private hideSpinner(): void {
    this.spinner.hide();
  }
}
