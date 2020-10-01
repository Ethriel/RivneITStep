import { SidebarModel } from './sidebar.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarModel: SidebarModel;
  constructor() {
    this.sidebarModel = new SidebarModel();
  }

  ngOnInit(): void {
  }

}
