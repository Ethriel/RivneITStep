import { Event } from './../../event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  currentEvent: Event;
  constructor() {
    this.currentEvent = new Event('Test title', 'Test descr', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png', '01/01/2020');
   }

  ngOnInit(): void {
  }

}
