import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './client-game/component/game/game.component';
import { MainScreenComponent } from './client-game/component/main-screen/main-screen.component';
import { ClickButtonDirective } from './client-game/directives/click-button.directive';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,       
    MainScreenComponent,
    ClickButtonDirective    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
