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
  isPrior = false;
  
  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
  }

  setPriority(): void {
    this.isPrior = !this.isPrior;
  }
  setIsHidden(): void {
    this.currentEvent.isHidden = !this.currentEvent.isHidden;
  }
  editClick():void{
    this.eventService.eventToEdit.emit(this.currentEvent);
  }
}
