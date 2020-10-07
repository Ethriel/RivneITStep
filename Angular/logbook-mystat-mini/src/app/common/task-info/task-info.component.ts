import { TaskModel } from './../../models/task.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

  @Input() task: TaskModel;
  constructor() { }

  ngOnInit(): void {
  }

}
