import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogbookBaseComponent } from './logbook/logbook-base/logbook-base.component';
import { MystatBaseComponent } from './mystat/mystat-base/mystat-base.component';
import { NewTasksListComponent } from './logbook/new-tasks-list/new-tasks-list.component';
import { DoneTasksListComponent } from './logbook/done-tasks-list/done-tasks-list.component';
import { UnderReviewTasksListComponent } from './logbook/under-review-tasks-list/under-review-tasks-list.component';
import { NewHomeworksListComponent } from './mystat/new-homeworks-list/new-homeworks-list.component';
import { DoneHomeworksListComponent } from './mystat/done-homeworks-list/done-homeworks-list.component';
import { UnderReviewHomeworksListComponent } from './mystat/under-review-homeworks-list/under-review-homeworks-list.component';
import { TaskInfoComponent } from './common/task-info/task-info.component';
import { TaskItemComponent } from './logbook/task-item/task-item.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AddTaskComponent } from './logbook/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LogbookBaseComponent,
    MystatBaseComponent,
    NewTasksListComponent,
    DoneTasksListComponent,
    UnderReviewTasksListComponent,
    NewHomeworksListComponent,
    DoneHomeworksListComponent,
    UnderReviewHomeworksListComponent,
    TaskInfoComponent,
    TaskItemComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
