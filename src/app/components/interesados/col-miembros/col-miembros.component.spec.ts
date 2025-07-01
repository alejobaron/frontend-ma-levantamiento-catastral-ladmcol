import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColMiembrosComponent } from './col-miembros.component';

describe('ColMiembrosComponent', () => {
  let component: ColMiembrosComponent;
  let fixture: ComponentFixture<ColMiembrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColMiembrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColMiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
