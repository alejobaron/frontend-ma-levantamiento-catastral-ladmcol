import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadConstruccionComponent } from './unidad-construccion.component';

describe('UnidadConstruccionComponent', () => {
  let component: UnidadConstruccionComponent;
  let fixture: ComponentFixture<UnidadConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadConstruccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
