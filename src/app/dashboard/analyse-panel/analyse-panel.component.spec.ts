import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysePanelComponent } from './analyse-panel.component';

describe('AnalysePanelComponent', () => {
  let component: AnalysePanelComponent;
  let fixture: ComponentFixture<AnalysePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
