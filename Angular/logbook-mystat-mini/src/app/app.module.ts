import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogbookBaseComponent } from './logbook/logbook-base/logbook-base.component';
import { MystatBaseComponent } from './mystat/mystat-base/mystat-base.component';
import { NewTasksListComponent } from './logbook/new-tasks-list/new-tasks-list.component';
import { DoneTasksListComponent } from './logbook/done-tasks-list/done-tasks-list.component';
import { UnderReviewTasksListComponent } from './logbook/under-review-tasks-list/under-review-tasks-list.component';
import { TaskItemComponent } from './common/task-item/task-item.component';
import { NewHomeworksListComponent } from './mystat/new-homeworks-list/new-homeworks-list.component';
import { DoneHomeworksListComponent } from './mystat/done-homeworks-list/done-homeworks-list.component';
import { UnderReviewHomeworksListComponent } from './mystat/under-review-homeworks-list/under-review-homeworks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LogbookBaseComponent,
    MystatBaseComponent,
    NewTasksListComponent,
    DoneTasksListComponent,
    UnderReviewTasksListComponent,
    TaskItemComponent,
    NewHomeworksListComponent,
    DoneHomeworksListComponent,
    UnderReviewHomeworksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
