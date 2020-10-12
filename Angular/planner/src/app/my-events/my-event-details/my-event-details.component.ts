import { Event } from './../../events/event.model';
import { EventService } from './../../events/eventService/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-my-event-details',
  templateUrl: './my-event-details.component.html',
  styleUrls: ['./my-event-details.component.css']
})
export class MyEventDetailsComponent implements OnInit {

  eventDetails: Event;
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.eventDetails = this.eventService.getEventById(id);
    });
  }

}
