import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment'




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
    AuthenticatedComponent,
    UnauthenticatedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}