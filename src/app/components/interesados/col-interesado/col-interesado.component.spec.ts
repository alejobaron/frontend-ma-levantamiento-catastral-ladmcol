import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColInteresadoComponent } from './col-interesado.component';

describe('ColInteresadoComponent', () => {
  let component: ColInteresadoComponent;
  let fixture: ComponentFixture<ColInteresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColInteresadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColInteresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
