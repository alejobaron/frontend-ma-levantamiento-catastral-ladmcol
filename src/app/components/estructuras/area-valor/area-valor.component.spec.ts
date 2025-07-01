import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaValorComponent } from './area-valor.component';

describe('AreaValorComponent', () => {
  let component: AreaValorComponent;
  let fixture: ComponentFixture<AreaValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaValorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
