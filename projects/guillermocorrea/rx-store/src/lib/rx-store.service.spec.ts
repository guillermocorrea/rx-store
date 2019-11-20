import { TestBed } from '@angular/core/testing';
import { RxStoreService } from './rx-store.service';
import { filter } from 'rxjs/operators';

interface Todo {
  id: number;
  name: string;
}

describe('RxStore', () => {
  let store: RxStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RxStoreService]
    });
    store = TestBed.get(RxStoreService);
  });

  it('should set and get state', done => {
    const key = 'todos';
    const state: Todo[] = [
      { id: 1, name: 'Drink a beer' },
      { id: 2, name: 'Play tennis' }
    ];
    store
      .select<Todo[]>(key)
      .pipe(filter(data => !!data))
      .subscribe({
        next: todos => {
          expect(todos).toEqual(state);
          done();
        }
      });
    store.set(key, state);
  });
});
