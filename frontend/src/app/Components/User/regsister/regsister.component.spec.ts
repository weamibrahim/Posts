import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsisterComponent } from './regsister.component';

describe('RegsisterComponent', () => {
  let component: RegsisterComponent;
  let fixture: ComponentFixture<RegsisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegsisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegsisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
