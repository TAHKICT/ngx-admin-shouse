import {NgModule, ModuleWithProviders, APP_INITIALIZER} from '@angular/core';
import { CommonModule } from '@angular/common';

import {NodesDataService} from "./nodes.data.service";
import {NodesEventsService} from "./nodes.events.service";
import {NodesWebSocketService} from "./nodes.web-socket.service";
import {AppConfig} from "../../config/app.config";

const SERVICES = [
  NodesDataService,
  NodesEventsService,
  // NodesWebSocketService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES
  ],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
