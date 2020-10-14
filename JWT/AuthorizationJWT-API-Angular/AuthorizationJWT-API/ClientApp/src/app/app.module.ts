import { DemoNgZorroAntdModule } from './ng-zorro.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AdminMainComponent } from './admin-area/admin-main/admin-main.component';
import { UserMainComponent } from './user-area/user-main/user-main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotifierModule, NotifierOptions, NotifierService } from 'angular-notifier';

const notifierConfig: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right'
    },
    vertical: {
      position: 'top'
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    AdminMainComponent,
    UserMainComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(notifierConfig),
    DemoNgZorroAntdModule
  ],
  providers: [
    NgxSpinnerService,
    NotifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
