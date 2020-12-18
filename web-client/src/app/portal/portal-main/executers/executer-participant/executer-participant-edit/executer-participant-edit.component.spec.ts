import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuterParticipantEditComponent } from './executer-participant-edit.component';

describe('ExecuterParticipantEditComponent', () => {
  let component: ExecuterParticipantEditComponent;
  let fixture: ComponentFixture<ExecuterParticipantEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuterParticipantEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuterParticipantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
