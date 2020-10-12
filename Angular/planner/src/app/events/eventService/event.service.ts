import { Event } from './../event.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  refreshList = new EventEmitter<Event[]>();
  eventToEdit = new EventEmitter<Event>();
  loadPortion = new EventEmitter<Event[]>();

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
  private page: number;
  private perPage = 2;
  private myEvents: Event[];
  private myEventsPages: number;

  constructor() {
    this.page = 1;
    this.setMyEvents();
  }

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
    return myEvents;
  }

  getEventById(id: number): Event {
    const ev = this.events.find(x => x.id === id);
    return ev;
  }

  getPages(): number[] {
    const pages: number[] = [];
    console.log(this.myEventsPages);
    for (let i = 1; i <= this.myEventsPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  nextClick(): void {
    this.increasePage();
    const start = this.getStart();
    const events = this.sliceMyEvents(start);
    if (events.length === 0) {
      this.loadPortion.emit(this.getLastPage());
    }
    else {
      this.loadPortion.emit(events);
    }
  }

  previousClick(): void {
    this.decreasePage();
    if (this.page === 0) {
      this.loadPortion.emit(this.getFirstPage());
    }
    else {
      const start = this.getStart();
      const events = this.sliceMyEvents(start);
      this.loadPortion.emit(events);
    }
  }

  getForPage(page: number): void {
    this.page = page;
    const start = this.getStart();
    const events = this.sliceMyEvents(start);
    this.loadPortion.emit(events);
  }

  getFirstPage(): Event[] {
    const events = this.sliceMyEvents(0);
    return events;
  }

  getLastPage(): Event[] {
    const index = this.events.length - this.perPage;
    const events = this.sliceMyEvents(index);
    return events;
  }

  private setMyEvents(): void {
    this.myEvents = this.getMyEvents();
    this.myEventsPages = +Math.ceil(this.myEvents.length / this.perPage);
  }

  private getStart(): number {
    const start = this.page * this.perPage - this.perPage;
    return start;
  }

  private sliceMyEvents(start: number): Event[] {
    const myEvents = this.getMyEvents();
    const end = start + this.perPage;
    const events = myEvents.slice(start, end);
    return events;
  }

  private increasePage(): void {
    if (this.page < this.myEventsPages) {
      this.page++;
    }
    else {
      this.page = this.myEventsPages;
    }
  }

  private decreasePage(): void {
    if (this.page > 0 && this.page <= this.myEventsPages) {
      this.page--;
    }
    else {
      this.page = 1;
    }
  }
}
