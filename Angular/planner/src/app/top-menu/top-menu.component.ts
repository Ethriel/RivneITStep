import { TopMenuModel } from './top.menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  topMenuModel: TopMenuModel;
  constructor() {
    this.topMenuModel = new TopMenuModel();
  }

  ngOnInit(): void {
  }

}
