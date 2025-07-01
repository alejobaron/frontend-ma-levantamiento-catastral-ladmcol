import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrFuenteEspacialComponent } from './cr-fuente-espacial.component';

describe('CrFuenteEspacialComponent', () => {
  let component: CrFuenteEspacialComponent;
  let fixture: ComponentFixture<CrFuenteEspacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrFuenteEspacialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrFuenteEspacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
