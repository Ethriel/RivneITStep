import { Event } from './../events/event.model';
import { EventService } from './../events/eventService/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit(): void {}

}
