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
  pages: number[];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.pages = this.eventService.getPages();
    this.events = this.eventService.getFirstPage();
    this.eventService.loadPortion.subscribe((events: Event[]) => {
      this.events = events;
    });
  }

  nextClick(): void {
    this.eventService.nextClick();
  }

  previousClick(): void {
    this.eventService.previousClick();
  }

  pageClick(page: number): void {
    this.eventService.getForPage(page);
  }
}
