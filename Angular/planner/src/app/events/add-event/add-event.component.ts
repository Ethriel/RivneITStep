import { EventService } from './../eventService/event.service';
import { Event } from './../event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  name: string;
  description: string;
  date: string;
  image: string;
  id: number;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.eventToEdit.subscribe((event: Event) => {
      this.id = event.id;
      this.name = event.name;
      this.description = event.description;
      this.date = event.startDate;
      this.image = event.imageURL;
      this.setEditForm();
    });
  }
  onSubmit(): void {
    if (this.id) {
      this.editEvent();
      this.id = undefined;
    }
    else {
      this.addEvent();
    }
  }
  private editEvent(): void {
    const newEvent: Event = new Event(this.name, this.description, this.image, this.date);
    this.eventService.submitEdit(newEvent, this.id);
    this.setSubmitForm();
  }
  private addEvent(): void {
    const newEvent: Event = new Event(this.name, this.description, this.image, this.date);
    this.eventService.addEvent(newEvent);
  }
  private setEditForm(): void {
    const h3 = document.getElementById('addEventText');
    h3.innerText = 'Edit event';
    const btn = document.getElementById('addEventSubmit');
    btn.innerText = 'Save';
  }
  private setSubmitForm(): void {
    const h3 = document.getElementById('addEventText');
    h3.innerText = 'Add event';
    const btn = document.getElementById('addEventSubmit');
    btn.innerText = 'Save';
  }
}
