import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarCategoriaComponent } from './inserir-editar-categoria.component';

describe('InserirEditarCategoriaComponent', () => {
  let component: InserirEditarCategoriaComponent;
  let fixture: ComponentFixture<InserirEditarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirEditarCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InserirEditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
