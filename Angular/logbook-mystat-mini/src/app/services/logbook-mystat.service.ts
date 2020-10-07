import { TaskModel } from './../models/task.model';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LogbookMystatService {

  private allTasks: TaskModel[] = [
    {
      id: uuid.v4(),
      topic: 'Topic 1',
      description: 'Description 1',
      date: '07/10/2020',
      isDone: false,
      isUnderReview: false,
      mark: -1
    },
    {
      id: uuid.v4(),
      topic: 'Topic 2',
      description: 'Description 2',
      date: '08/10/2020',
      isDone: false,
      isUnderReview: false,
      mark: -1
    },
    {
      id: uuid.v4(),
      topic: 'Topic 3',
      description: 'Description 3',
      date: '09/10/2020',
      isDone: false,
      isUnderReview: false,
      mark: -1
    },
    {
      id: uuid.v4(),
      topic: 'Topic 4',
      description: 'Description 4',
      date: '10/10/2020',
      isDone: false,
      isUnderReview: false,
      mark: -1
    },
    {
      id: uuid.v4(),
      topic: 'Topic 5',
      description: 'Description 5',
      date: '11/10/2020',
      isDone: false,
      isUnderReview: false,
      mark: -1
    }
  ]
  constructor() { }

  getAllTasks(): TaskModel[] {
    return this.allTasks.map(t => t);
  }

  getNewTasks(): TaskModel[] {
    const newTasks = this.allTasks.filter(t => t.isDone === false && t.isUnderReview === false);
    return newTasks;
  }

  getDoneTasks(): TaskModel[] {
    const doneTasks = this.allTasks.filter(t => t.isDone === true && t.isUnderReview === false);
    return doneTasks;
  }

  getUnderReviewTasks(): TaskModel[] {
    const underReviewTasks = this.allTasks.filter(t => t.isUnderReview === true && t.isDone === false);
    return underReviewTasks;
  }

  addTask(task: TaskModel): void {
    this.allTasks.push(task);
  }

  doHomeWork(id: string): void {
    this.allTasks = this.allTasks.map(t => {
      if (t.id === id) {
        t.isUnderReview = true;
        t.isDone = false;
      }
      return t;
    });
  }

  evaluateTask(id: string): void {
    this.allTasks = this.allTasks.map(t => {
      if (t.id === id) {
        t.isDone = true;
        t.isUnderReview = false;
      }
      return t;
    });
  }
}
