import { Event } from './../event.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  refreshList = new EventEmitter<Event[]>();
  eventToEdit = new EventEmitter<Event>();

  private events: Event[] = [
    {
      id: 1,
      name: 'Event 1',
      description: 'Event 1 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '01.01.2020',
      isHidden: false,
      isPrior: false,
      isDone: false
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Event 2 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '02.01.2020',
      isHidden: false,
      isPrior: false,
      isDone: false
    },
    {
      id: 3,
      name: 'Event 3',
      description: 'Event 3 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '03.01.2020',
      isHidden: false,
      isPrior: false,
      isDone: false
    },
    {
      id: 4,
      name: 'Event 4',
      description: 'Event 4 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '04.01.2020',
      isHidden: false,
      isPrior: false,
      isDone: false
    },
    {
      id: 5,
      name: 'Event 5',
      description: 'Event 5 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '05.01.2020',
      isHidden: false,
      isPrior: false,
      isDone: false
    }
  ];

  getAllEvents(): Event[] {
    return this.events.map((ev) => ev);
  }

  addEvent(event: Event): void {
    const lastId = this.events[this.events.length - 1].id;
    event.id = lastId + 1;
    this.events.push(event);
    this.refreshList.emit(this.getAllEvents());
  }

  submitEdit(event: Event, id: number): void {
    const newEvents = this.events.map((ev) => {
      if (ev.id === id) {
        event.id = id;
        return event;
      }
      return ev;
    });
    this.events = newEvents;
    this.refreshList.emit(this.getAllEvents());
  }

  getMyEvents(): Event[] {
    const myEvents = this.events.filter((event) =>
      event.isDone === false && event.isHidden === false
    );
    console.log(myEvents);
    return myEvents;
  }
  constructor() { }
}
