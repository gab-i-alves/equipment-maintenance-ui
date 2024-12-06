import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaDeEquipamento } from '../../../../models/categoriaDeEquipamento/categoriaDeEquipamento.model';
import { EquipmentCategoryService } from '../../../../services/equipment-category/equipment-category.service';
import { FormsModule } from '@angular/forms';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { Modal } from 'bootstrap';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-inserir-editar-categoria',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule],
  templateUrl: './inserir-editar-categoria.component.html',
  styleUrl: './inserir-editar-categoria.component.css'
})
export class InserirEditarCategoriaComponent implements OnInit {
  
  categoria: CategoriaDeEquipamento = new CategoriaDeEquipamento(0, '');
  editMode: boolean = false;
  errorMessage = "";

  constructor(
    private categoriaService: EquipmentCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    if(!isNaN(id)){
      this.editMode = true;
      const categoria = this.buscarPorId(id);
      if (categoria != null) {
        this.categoria = categoria;
      }
    }
  }

  salvarCategoria(): void {
    if(this.isEmpty(this.categoria)){
      this.errorMessage = 'Preencha todos os campos corretamente';
      this.openErrorModal();
      return
    }

    if(this.editMode){
      this.categoriaService.atualizar(this.categoria).subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.openErrorModal();
        }
      });
          } else {
      this.categoriaService.inserir(this.categoria).subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.openErrorModal();
        }
      });
    }
  }

  buscarPorId(id: number): void {
    this.categoriaService.buscarPorId(id).subscribe({
      next: (data: CategoriaDeEquipamento | null) => {
        if (data != null) {
          this.categoria = data;
        }
      },
      error: (err) => {
        console.log(err.status + " // " + err.error);
      }
    });
  }

  openErrorModal() {
    const errorModalElement = document.getElementById('errorModal');
    if (errorModalElement) {
      const errorModal = new Modal(errorModalElement);
      errorModal.show();
    }
  }

  isEmpty(categoria: CategoriaDeEquipamento) : boolean{
    for (const atr in categoria) {
      if (categoria.hasOwnProperty(atr)) {
          if ((categoria as any)[atr] === '') {
              return true;
          }
      }
    }
    return false;
  }
}
