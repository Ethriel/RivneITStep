import { EventService } from './../../../events/eventService/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../events//event.model';

@Component({
  selector: 'app-my-event-item',
  templateUrl: './my-event-item.component.html',
  styleUrls: ['./my-event-item.component.css']
})
export class MyEventItemComponent implements OnInit {

  @Input() currentEvent: Event;
  constructor() { }

  ngOnInit(): void {
  }
}
