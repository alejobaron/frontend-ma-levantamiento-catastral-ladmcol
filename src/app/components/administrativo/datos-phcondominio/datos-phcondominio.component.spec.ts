import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPHCondominioComponent } from './datos-phcondominio.component';

describe('DatosPHCondominioComponent', () => {
  let component: DatosPHCondominioComponent;
  let fixture: ComponentFixture<DatosPHCondominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPHCondominioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPHCondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
