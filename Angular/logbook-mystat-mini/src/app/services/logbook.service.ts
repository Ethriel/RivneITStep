import { LogbookMystatService } from './logbook-mystat.service';
import { TaskModel } from './../models/task.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogbookService {

  refreshDoneTasks = new EventEmitter<TaskModel[]>();
  refreshUnderReviewTasks = new EventEmitter<TaskModel[]>();
  refreshNewTasks = new EventEmitter<TaskModel[]>();

  constructor(private logbookMystatService: LogbookMystatService) { }

  getAllTasks(): TaskModel[] {
    return this.logbookMystatService.getAllTasks();
  }

  getNewTasks(): TaskModel[] {
    return this.logbookMystatService.getNewTasks();
  }

  getDoneTasks(): TaskModel[] {
    return this.logbookMystatService.getDoneTasks();
  }

  getUnderReviewTasks(): TaskModel[] {
    return this.logbookMystatService.getUnderReviewTasks();
  }

  addTask(task: TaskModel): void {
    this.logbookMystatService.addTask(task);
    this.refreshNewTasks.emit(this.getNewTasks());
  }

  evaluateTask(id: string): void {
    this.logbookMystatService.evaluateTask(id);
    this.refreshDoneTasks.emit(this.getDoneTasks());
  }
}
