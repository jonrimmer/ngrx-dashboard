import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { State, getDashboardLatest, getDashboardMeasurements, getDashboardError } from '../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Measurement } from '../models/measurement';
import { DashboardManualRetryAction } from '../actions/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('blockInitial', [
      transition(':enter', [])
    ]),
    trigger('measurementTrigger', [
      transition(':enter', [
        style({ left: '100%' }),
        animate('0.2s linear', style({}))
      ]),
      transition(':leave', [
        animate('0.2s linear', style({
          left: '-5%'
        }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  latest$: Observable<number>;
  measurements$: Observable<Measurement[]>;
  error$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.latest$ = this.store.select(getDashboardLatest);
    this.measurements$ = this.store.select(getDashboardMeasurements);
    this.error$ = this.store.select(getDashboardError);
  }

  ngOnInit() {}

  getTimestamp(index, measurement: Measurement) {
    return measurement ? measurement.timestamp : index;
  }

  manualRetry() {
    this.store.dispatch(new DashboardManualRetryAction());
  }
}
