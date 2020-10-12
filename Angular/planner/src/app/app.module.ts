import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventItemComponent } from './events/events-list/event-item/event-item.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksComponent } from './events/tasks/tasks.component';
import { TasksListComponent } from './events/tasks/tasks-list/tasks-list.component';
import { TaskItemComponent } from './events/tasks/tasks-list/task-item/task-item.component';
import { AddTaskComponent } from './events/tasks/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { IdTestComponent } from './id-test/id-test.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { MyEventsListComponent } from './my-events/my-events-list/my-events-list.component';
import { MyEventItemComponent } from './my-events/my-events-list/my-event-item/my-event-item.component';
import { MyEventDetailsComponent } from './my-events/my-event-details/my-event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    AddEventComponent,
    EventsListComponent,
    EventItemComponent,
    TopMenuComponent,
    SidebarComponent,
    TasksComponent,
    TasksListComponent,
    TaskItemComponent,
    AddTaskComponent,
    HomePageComponent,
    PageNotFoundComponent,
    AppInfoComponent,
    ContactsComponent,
    AboutComponent,
    IdTestComponent,
    MyEventsComponent,
    MyEventsListComponent,
    MyEventItemComponent,
    MyEventDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
