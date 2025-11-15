import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBill } from './list-bill';

describe('ListBill', () => {
  let component: ListBill;
  let fixture: ComponentFixture<ListBill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
