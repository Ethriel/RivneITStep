import { TaskModel } from './../../task.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: TaskModel;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
