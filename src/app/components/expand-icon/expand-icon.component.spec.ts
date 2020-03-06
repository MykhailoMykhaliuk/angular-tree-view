import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandIconComponent } from './expand-icon.component';

describe('ExpandIconComponent', () => {
  let component: ExpandIconComponent;
  let fixture: ComponentFixture<ExpandIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
