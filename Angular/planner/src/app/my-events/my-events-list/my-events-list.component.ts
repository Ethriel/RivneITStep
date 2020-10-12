import { Event } from './../../events/event.model';
import { EventService } from './../../events/eventService/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events-list',
  templateUrl: './my-events-list.component.html',
  styleUrls: ['./my-events-list.component.css']
})
export class MyEventsListComponent implements OnInit {

  events: Event[];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events = this.eventService.getMyEvents();
  }

}
