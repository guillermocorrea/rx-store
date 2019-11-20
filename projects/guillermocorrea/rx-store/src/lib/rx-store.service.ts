import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

const state = {};

@Injectable({
  providedIn: 'root',
})
export class RxStoreService {
  private subject = new BehaviorSubject<any>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(key: string): Observable<T> {
    return this.store.pipe(
      pluck(key)
    );
  }

  set(key: string, state: any) {
    this.subject.next({
      ...this.value,
      [key]: state
    });
  }
}
