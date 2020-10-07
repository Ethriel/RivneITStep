import { EventService } from './../eventService/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events: Event[];
  showEdit: boolean;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events = this.eventService.getAllEvents();
    this.eventService.refreshList.subscribe((events: Event[]) => {
      this.events = events;
    });
  }
}
