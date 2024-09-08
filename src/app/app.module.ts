import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsComponent } from './cards/cards.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServerModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
        withFetch() // Enable fetch API
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
