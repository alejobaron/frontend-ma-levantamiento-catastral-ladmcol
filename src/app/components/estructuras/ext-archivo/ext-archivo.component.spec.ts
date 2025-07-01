import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtArchivoComponent } from './ext-archivo.component';

describe('ExtArchivoComponent', () => {
  let component: ExtArchivoComponent;
  let fixture: ComponentFixture<ExtArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtArchivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
