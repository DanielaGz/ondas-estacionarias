import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent} from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { FormComponent } from './form/form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphicsComponent } from './graphics/graphics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    FormComponent,
    GraphicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
