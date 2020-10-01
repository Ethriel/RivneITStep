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

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    AddEventComponent,
    EventsListComponent,
    EventItemComponent,
    TopMenuComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
