import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfig{

  private _config: Object

  constructor(private http: HttpClient) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get('app/config/config.json')
        .subscribe(data => {
          this._config = data;
          // tslint:disable-next-line:no-console
          console.log(data);
          console.log('Configs loaded successfully!');
          resolve(true);
        });
    });
  }

  get(key: any) {
    return this._config[key];
  }

}
