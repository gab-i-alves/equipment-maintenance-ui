import { Injectable } from '@angular/core';
import { EquipmentCategory } from '../../models/equipment-category/equipment-category.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentCategoryService {
  private readonly STORAGE_KEY = 'equipment_categories';

  listarTodos(): EquipmentCategory[] {
    const categorias = localStorage.getItem(this.STORAGE_KEY);
    return categorias ? JSON.parse(categorias) : [];
  }

  inserir(categoria: EquipmentCategory): void {
    const categorias = this.listarTodos();
    categoria.id = new Date().getTime();
    categorias.push(categoria);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categorias));
  }

  buscarPorId(id: number): EquipmentCategory | undefined {
    const categorias = this.listarTodos();
    return categorias.find(categoria => categoria.id === id);
  }

  atualizar(categoria: EquipmentCategory): void {
    const categorias = this.listarTodos();
    const index = categorias.findIndex(c => c.id === categoria.id);
    if (index >= 0) {
      categorias[index] = categoria;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categorias));
    }
  }

  remover(id: number): void {
    let categorias = this.listarTodos();
    categorias = categorias.filter(categoria => categoria.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categorias));
  }
}
