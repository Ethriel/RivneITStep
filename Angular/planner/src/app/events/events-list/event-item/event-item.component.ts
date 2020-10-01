import { Event } from './../../event.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input() currentEvent: Event;
  @Input() index: number;
  isPrior: boolean = false;

  setPriority(){
    this.isPrior = !this.isPrior;
  }
  constructor() {
  }

  ngOnInit(): void {
  }

}
