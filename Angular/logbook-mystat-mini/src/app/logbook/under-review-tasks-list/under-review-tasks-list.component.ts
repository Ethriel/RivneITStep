import { LogbookService } from './../../services/logbook.service';
import { TaskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-under-review-tasks-list',
  templateUrl: './under-review-tasks-list.component.html',
  styleUrls: ['./under-review-tasks-list.component.css']
})
export class UnderReviewTasksListComponent implements OnInit {

  tasks: TaskModel[]
  constructor(private logbookService: LogbookService) { }

  ngOnInit(): void {
    this.tasks = this.logbookService.getUnderReviewTasks();
    this.logbookService.refreshUnderReviewTasks.subscribe((tasks: TaskModel[]) => { this.tasks = tasks });
  }

}
