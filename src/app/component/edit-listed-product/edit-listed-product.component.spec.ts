import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListedProductComponent } from './edit-listed-product.component';

describe('EditListedProductComponent', () => {
  let component: EditListedProductComponent;
  let fixture: ComponentFixture<EditListedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
