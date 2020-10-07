import { LogbookService } from './../../services/logbook.service';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-done-tasks-list',
  templateUrl: './done-tasks-list.component.html',
  styleUrls: ['./done-tasks-list.component.css']
})
export class DoneTasksListComponent implements OnInit {

  tasks: TaskModel[]
  constructor(private logbookService: LogbookService) { }

  ngOnInit(): void {
    this.tasks = this.logbookService.getUnderReviewTasks();
    this.logbookService.refreshDoneTasks.subscribe((tasks: TaskModel[]) => { this.tasks = tasks });
  }

}
