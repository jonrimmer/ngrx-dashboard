import { Component } from '@angular/core';
import { DataApiService } from './data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dataApi: DataApiService) {}
}
