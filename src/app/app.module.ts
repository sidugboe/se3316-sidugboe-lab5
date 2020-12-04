import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { AuthModule, AuthHttpInterceptor} from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ConfigService } from './anauthenticated/anauthenticated.component';
import { AnauthenticatedComponent } from './anauthenticated/anauthenticated.component';





@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ExternalApiComponent,
    AnauthenticatedComponent,
  ],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,

    }

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`$ { env.dep.apiUrl }/api/messages/protected-message`],
      }
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
