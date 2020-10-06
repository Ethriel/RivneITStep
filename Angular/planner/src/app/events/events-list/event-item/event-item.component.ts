import { EventService } from './../../eventService/event.service';
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

  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
  }

  setPriority(): void {
    this.currentEvent.isPrior = !this.currentEvent.isPrior;
    this.eventService.submitEdit(this.currentEvent, this.currentEvent.id);
  }
  setIsDone(): void {
    this.currentEvent.isDone = !this.currentEvent.isDone;
    this.eventService.submitEdit(this.currentEvent, this.currentEvent.id);
  }
  setIsHidden(): void {
    this.currentEvent.isHidden = !this.currentEvent.isHidden;
    this.eventService.submitEdit(this.currentEvent, this.currentEvent.id);
  }
  editClick(): void {
    this.eventService.eventToEdit.emit(this.currentEvent);
  }
}
