import { TaskModel } from './../../models/task.model';
import { LogbookService } from './../../services/logbook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  topic: string;
  description: string;
  date: string;

  constructor(private logbookService: LogbookService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const task = new TaskModel(this.topic, this.date, this.description);
    this.logbookService.addTask(task);
  }
}
