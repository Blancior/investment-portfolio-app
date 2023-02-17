import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPanelComponent } from './management-panel.component';


describe('AnalysePanelComponent', () => {
  let component: ManagementPanelComponent;
  let fixture: ComponentFixture<ManagementPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
