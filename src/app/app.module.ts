/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as SockJS from 'sockjs-client';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import {AppConfig} from "./config/app.config";
import {NodesWebSocketService} from "./@core/services/nodes.web-socket.service";
import {NodesDataService} from "./@core/services/nodes.data.service";

export function socketProvider() {
  return new SockJS('http://localhost:8282/s-house-rest-api-web-websocket-registration');
}

const stompConfig: StompConfig = {
  url: socketProvider,
  headers: {},
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: true
};

//initialize queue
let initializeConfig = (appConfig: AppConfig,
                        nodesWebSocketService: NodesWebSocketService) => () => {
  let configsAndWebSocketLoadPromise = appConfig.load();
  configsAndWebSocketLoadPromise
    .then(() => nodesWebSocketService.init())
  return configsAndWebSocketLoadPromise;
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },

    AppConfig,
    NodesWebSocketService,
    // { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true},
    { provide:
      APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [ AppConfig, NodesWebSocketService ],
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
