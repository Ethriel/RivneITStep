import { LogbookService } from './../../services/logbook.service';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tasks-list',
  templateUrl: './new-tasks-list.component.html',
  styleUrls: ['./new-tasks-list.component.css']
})
export class NewTasksListComponent implements OnInit {

  tasks: TaskModel[]
  constructor(private logbookService: LogbookService) { }

  ngOnInit(): void {
    this.tasks = this.logbookService.getNewTasks();
    this.logbookService.refreshNewTasks.subscribe((tasks: TaskModel[]) => { this.tasks = tasks });
  }

}
