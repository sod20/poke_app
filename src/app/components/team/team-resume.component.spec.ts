import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamResumeComponent } from './team-resume.component';

describe('TeamComponent', () => {
  let component: TeamResumeComponent;
  let fixture: ComponentFixture<TeamResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
