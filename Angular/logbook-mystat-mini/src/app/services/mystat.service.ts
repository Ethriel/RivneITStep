import { LogbookMystatService } from './logbook-mystat.service';
import { TaskModel } from './../models/task.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MystatService {

  refreshUnderReviewTask = new EventEmitter<TaskModel[]>();
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

  doHomeWork(id: string): void {
    this.logbookMystatService.doHomeWork(id);
    this.refreshUnderReviewTask.emit(this.getUnderReviewTasks());
  }
}
