import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFuenteEspacialComponent } from './col-fuente-espacial.component';

describe('ColFuenteEspacialComponent', () => {
  let component: ColFuenteEspacialComponent;
  let fixture: ComponentFixture<ColFuenteEspacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColFuenteEspacialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColFuenteEspacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
