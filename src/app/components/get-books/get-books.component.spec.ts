import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbooksComponent } from './get-books.component';

describe('GetBooksComponent', () => {
  let component: GetbooksComponent;
  let fixture: ComponentFixture<GetbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
