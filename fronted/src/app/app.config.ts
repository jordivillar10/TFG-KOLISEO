import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';
import { DatePipe } from '@angular/common';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideToastr({timeOut: 2500,positionClass: 'toast-bottom-right', preventDuplicates: true}) 
  ,provideRouter(routes),provideHttpClient(withInterceptors([addTokenInterceptor])),DatePipe
  ]
};
