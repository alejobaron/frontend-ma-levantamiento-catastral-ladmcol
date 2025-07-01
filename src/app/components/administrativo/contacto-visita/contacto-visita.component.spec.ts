import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoVisitaComponent } from './contacto-visita.component';

describe('ContactoVisitaComponent', () => {
  let component: ContactoVisitaComponent;
  let fixture: ComponentFixture<ContactoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
