import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtInteresadoComponent } from './ext-interesado.component';

describe('ExtInteresadoComponent', () => {
  let component: ExtInteresadoComponent;
  let fixture: ComponentFixture<ExtInteresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtInteresadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtInteresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
