import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events: Event[] = [
    {
      name: 'Event 1',
      description: 'Event 1 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '01.01.2020'
    },
    {
      name: 'Event 2',
      description: 'Event 2 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '02.01.2020'
    },
    {
      name: 'Event 3',
      description: 'Event 3 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '03.01.2020'
    },
    {
      name: 'Event 4',
      description: 'Event 4 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '04.01.2020'
    },
    {
      name: 'Event 5',
      description: 'Event 5 descr',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      startDate: '05.01.2020'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
