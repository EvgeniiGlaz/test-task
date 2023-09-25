import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';
import { share } from 'rxjs/internal/operators/share';
import { Observable } from 'rxjs/internal/Observable';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  firstStream$: Observable<any>;
  secondStream$: Observable<any>;
  thirdStream$: Observable<any>;
  private cancel$ = new Subject();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const sharedData$ = this.cancel$.pipe(
      switchMap(() => this.dataService.getData()),
      share()
    );

    this.firstStream$ = sharedData$.pipe(delay(1000));
    this.secondStream$ = sharedData$.pipe(delay(2000));
    this.thirdStream$ = sharedData$.pipe(delay(3000));

    this.fetchData();
  }

  fetchData() {
    this.cancel$.next(null);
  }
}
