import { Component, OnInit } from '@angular/core';
import { EquipmentCategory } from '../../../../models/equipment-category/equipment-category.model';
import { EquipmentCategoryService } from '../../../../services/equipment-category/equipment-category.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListarCategoriaComponent implements OnInit {
  categorias: EquipmentCategory[] = [];

  constructor(private categoriaService: EquipmentCategoryService) {}

  ngOnInit(): void {
    // this.categorias = this.categoriaService.listarTodos();
    
    this.categorias = [
      { id: 1, name: 'Notebook' },
      { id: 2, name: 'Máquina de Lavar' },
      { id: 3, name: 'Smartphone' }
    ];
  }

  removerCategoria(id: number): void {
    if (confirm('Deseja realmente remover esta categoria?')) {
      this.categoriaService.remover(id);
      // this.categorias = this.categoriaService.listarTodos();
      this.categorias = this.categorias.filter(categoria => categoria.id !== id);
    }
  }
}