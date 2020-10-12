import { MyEventDetailsComponent } from './my-events/my-event-details/my-event-details.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { IdTestComponent } from './id-test/id-test.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventsComponent } from './events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'events', component: EventsComponent, pathMatch: 'full' },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'my-events/:id', component: MyEventDetailsComponent },
  {
    path: 'about', component: AboutComponent, children: [
      { path: 'info', component: AppInfoComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: ':id', component: IdTestComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
