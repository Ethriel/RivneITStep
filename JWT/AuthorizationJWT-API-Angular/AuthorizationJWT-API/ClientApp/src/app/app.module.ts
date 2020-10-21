import { TokenInterceptor } from './authentication/interceptors/token.interceptor';
import { DemoNgZorroAntdModule } from './ng-zorro.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { NZ_ICONS } from 'ng-zorro-antd/icon'
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ProductsListComponent } from './admin-area/products/products-list/products-list.component';
import { AddProductComponent } from './admin-area/products/add-product/add-product.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

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
    NotFoundComponent,
    ProductsListComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(notifierConfig),
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [
    NgxSpinnerService,
    NotifierService,
    { 
      provide: NZ_ICONS,
      useValue: icons
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
