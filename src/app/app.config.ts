// import {
//   ApplicationConfig,
//   importProvidersFrom,
//   provideZoneChangeDetection,
// } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideToastr } from 'ngx-toastr';
// import { NgxSpinnerModule } from 'ngx-spinner';

// import { routes } from './app.routes';
// import {
//   provideClientHydration,
//   withEventReplay,
// } from '@angular/platform-browser';
// import {
//   HttpClient,
//   provideHttpClient,
//   withFetch,
//   withInterceptors,
// } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
// import { errorsInterceptor } from './core/interceptors/headers/errors/errors.interceptor';
// import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '/i18n/', '.json');
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideClientHydration(withEventReplay()),
//     provideHttpClient(
//       withFetch(),
//       withInterceptors([
//         headersInterceptor,
//         errorsInterceptor,
//         loadingInterceptor,
//       ])
//     ),
//     provideAnimations(),
//     provideToastr(),
//     importProvidersFrom(NgxSpinnerModule ,TranslateModule.forRoot({
//       loader:{
//         provide: TranslateLoader , useFactory:HttpLoaderFactory , deps:[HttpClient]
//       }
//     })),
//   ],
// };



import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/headers/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        errorsInterceptor,
        loadingInterceptor,
      ])
    ),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      NgxSpinnerModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
