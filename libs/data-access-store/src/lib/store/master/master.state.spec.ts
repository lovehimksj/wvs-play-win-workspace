import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MasterState, MasterStateModel } from './master.state';
import { MasterAction } from './master.actions';

describe('Master store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MasterState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: MasterStateModel = {
      items: ['item-1'],
    };
    store.dispatch(new MasterAction('item-1'));
    const actual = store.selectSnapshot(MasterState.getState);
    expect(actual).toEqual(expected);
  });
});
