import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizesComponent } from './add-quizes.component';

describe('AddQuizesComponent', () => {
  let component: AddQuizesComponent;
  let fixture: ComponentFixture<AddQuizesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizesComponent]
    });
    fixture = TestBed.createComponent(AddQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
