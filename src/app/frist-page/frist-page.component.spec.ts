import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FristPageComponent } from './frist-page.component';

describe('FristPageComponent', () => {
  let component: FristPageComponent;
  let fixture: ComponentFixture<FristPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FristPageComponent]
    });
    fixture = TestBed.createComponent(FristPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
