import { Injectable } from '@angular/core';
import { EquipmentCategory } from '../../models/equipment-category/equipment-category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentCategoryService {
  private readonly STORAGE_KEY = 'equipment_categories';
  BASE_URL = 'http://localhost:8080/api/categorias-equipamento';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getCategorias(){
    return this.http.get<any>(`${this.BASE_URL}`, this.httpOptions);
  }
  
  getCategoriaPorId(id: string){
    return this.http.get<any>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }

  delete(id: string){
    return this.http.get<any>(`${this.BASE_URL}/delete/${id}`, this.httpOptions);
  }

  insert(category: EquipmentCategory): Observable<EquipmentCategory|null> {
    return this.http.post<EquipmentCategory>(this.BASE_URL,
      JSON.stringify(category),
      this.httpOptions);
  };
  
  update(category: EquipmentCategory): Observable<EquipmentCategory|null> {
    return this.http.put<EquipmentCategory>(`${this.BASE_URL}/update/${category.id}`,
      JSON.stringify(category),
      this.httpOptions);
  };


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
