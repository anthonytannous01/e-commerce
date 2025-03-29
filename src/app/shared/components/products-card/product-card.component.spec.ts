import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductCardComponent } from './product-card.component'

describe('ProductDetailComponent', () => {
  let component: ProductCardComponent
  let fixture: ComponentFixture<ProductCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
