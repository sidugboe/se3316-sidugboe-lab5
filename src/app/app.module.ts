import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ConfigService } from './app.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeroComponent,
    HomeContentComponent,
    LoadingComponent,
    MainNavComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    ExternalApiComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  providers: [
    ConfigService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
