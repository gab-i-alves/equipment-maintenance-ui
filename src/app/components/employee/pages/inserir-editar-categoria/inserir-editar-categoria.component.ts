import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EquipmentCategory } from '../../../../models/equipment-category/equipment-category.model';
import { EquipmentCategoryService } from '../../../../services/equipment-category/equipment-category.service';
import { FormsModule } from '@angular/forms';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-inserir-editar-categoria',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule],
  templateUrl: './inserir-editar-categoria.component.html',
  styleUrl: './inserir-editar-categoria.component.css'
})
export class InserirEditarCategoriaComponent implements OnInit {
  categoria: EquipmentCategory = new EquipmentCategory(0, '');
  editMode: boolean = false;

  constructor(
    private categoriaService: EquipmentCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      const categoria = this.categoriaService.buscarPorId(id);
      if (categoria) this.categoria = categoria;
    }
  }

  salvarCategoria(): void {
    if (this.editMode) {
      this.categoriaService.atualizar(this.categoria);
    } else {
      this.categoriaService.inserir(this.categoria);
    }
    this.router.navigate(['/categories']);
  }
}
