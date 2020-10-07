import { LogbookService } from './../../services/logbook.service';
import { TaskModel } from './../../models/task.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: TaskModel;
  constructor(private logbookService: LogbookService) { }

  ngOnInit(): void {
  }

  evaluateTask(): void {
    this.logbookService.evaluateTask(this.task.id);
  }
}
