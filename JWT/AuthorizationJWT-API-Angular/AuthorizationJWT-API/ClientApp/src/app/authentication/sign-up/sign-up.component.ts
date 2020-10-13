import { AuthService } from '../../services/auth-service/auth-service.';
import { NotifierService } from 'angular-notifier';
import { SignUpModel } from './../../models/sign-up.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model: SignUpModel;
  confirmPassword: string;
  constructor(
    private spinner: NgxSpinnerService,
    private notify: NotifierService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.model = new SignUpModel();
  }

  submit() {
    this.spinner.show();
    this.notify.hideAll();

    if (!this.model.isValid()) {
      this.notify.notify("error", "Fill all fields, please!")
    }
    else if (!this.model.isEmail()) {
      this.notify.notify("error", "Email has invalid format");
    }
    else if (!this.checkPassword()) {
      this.notify.notify("error", "Passwords don't match!");
    }
    else {
      this.authService.signUp(this.model).subscribe(data => {
        if (data.status === 200) {
          this.notify.notify("success", "Sign up was successful");
          this.router.navigate(["/sign-in"]);
        }
        else {
          for (let error of data.errors) {
            this.notify.notify("error", error);
          }
        }
      });

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
  }

  private checkPassword(): boolean {
    return this.confirmPassword === this.model.password;
  }
}
