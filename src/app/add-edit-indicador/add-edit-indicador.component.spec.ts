import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIndicadorComponent } from './add-edit-indicador.component';

describe('AddEditIndicadorComponent', () => {
  let component: AddEditIndicadorComponent;
  let fixture: ComponentFixture<AddEditIndicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIndicadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
