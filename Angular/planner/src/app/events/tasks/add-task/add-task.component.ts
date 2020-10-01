import { TaskModel } from './../task.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: TaskModel;
  @Input() description: string;
  constructor() { }

  onSubmit() {
    this.task = new TaskModel(this.description);
    console.log(this.task.description);
  }
  ngOnInit(): void {
  }

}
