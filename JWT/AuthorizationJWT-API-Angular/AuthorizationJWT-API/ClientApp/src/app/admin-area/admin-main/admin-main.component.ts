import { Component, OnInit } from '@angular/core';
import './admin-main.component.css';

@Component({
  selector: 'app-admin-main',
  templateUrl:'./admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  isCollapsed: boolean;
  constructor() { }

  ngOnInit() {
    this.isCollapsed = false;
  }

}
