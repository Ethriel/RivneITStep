import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'events', component: EventsListComponent, pathMatch: 'full' },
  {
    path: 'about', component: AboutComponent, children: [
      { path: 'info', component: AppInfoComponent },
      { path: 'contacts', component: ContactsComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
