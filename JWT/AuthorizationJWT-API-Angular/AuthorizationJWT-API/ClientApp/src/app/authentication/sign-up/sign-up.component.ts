import { NotifierService } from 'angular-notifier';
import { SignUpModel } from './../../models/sign-up.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model: SignUpModel;
  confirmPassword: string;
  constructor(private spinner: NgxSpinnerService, private notify: NotifierService) {
  }

  ngOnInit() {
    this.model = new SignUpModel();
  }

  submit() {
    this.notify.notify('success', 'Ok');
    this.notify.notify('error', 'Error');
    console.log(this.model, this.confirmPassword);
  }
}
