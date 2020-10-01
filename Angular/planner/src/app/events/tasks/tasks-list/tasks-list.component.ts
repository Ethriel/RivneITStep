import { TaskModel } from './../task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: TaskModel[] = [
    { description: "Task 1" },
    { description: "Task 2" },
    { description: "Task 3" },
    { description: "Task 4" },
    { description: "Task 5" }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
