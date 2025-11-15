import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkServices } from './work-services';

describe('WorkServices', () => {
  let component: WorkServices;
  let fixture: ComponentFixture<WorkServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
