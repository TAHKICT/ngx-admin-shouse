import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {NodesDataService} from "./@core/services/nodes.data.service";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private nodesDataService: NodesDataService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.nodesDataService.init();
  }
}
