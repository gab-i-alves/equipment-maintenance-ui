import { Component, OnInit } from '@angular/core';
import { EquipmentCategory } from '../../../../models/equipment-category/equipment-category.model';
import { EquipmentCategoryService } from '../../../../services/equipment-category/equipment-category.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import DataTable from 'datatables.net-dt';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-responsive';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListarCategoriaComponent implements OnInit {
  categorias: EquipmentCategory[] = [];
  dataTable: any;

  constructor(private categoriaService: EquipmentCategoryService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      (data: EquipmentCategory[]) => {
        this.categorias = data;

        setTimeout(() => this.initializeDataTable(), 100);
      },
      (error) => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     if (!$.fn.dataTable.isDataTable('#tableSolic')) {
  //       new DataTable('#tableSolic', {
  //         responsive: true,
  //         paging: true,
  //         pageLength: 7,
  //         lengthChange: false,
  //         searching: false,
  //         info: false,
  //         language: {
  //           processing: "Processando...",
  //           zeroRecords: "Nenhum registro encontrado",
  //           info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
  //           infoEmpty: "Mostrando 0 até 0 de 0 registros",
  //           infoFiltered: "(filtrado de _MAX_ registros no total)",
  //           search: "Buscar:",
  //         }
  //       });
  //     }
  //   }, 0);
  // }

  initializeDataTable() {

  
    this.dataTable = new DataTable('#tableSolic', {
      responsive: true,
      paging: true,
      pageLength: 8,
      lengthChange: false,
      searching: false,
      info: false,
      language: {
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(filtrado de _MAX_ registros no total)",
        search: "Buscar:",
      }
    });
  }

  removerCategoria(id: number): void {
    if (confirm('Deseja realmente remover esta categoria?')) {
      this.categoriaService.delete(String(id));

      this.categoriaService.getCategorias().subscribe(
        (data: EquipmentCategory[]) => {
          this.categorias = data;
        },
        (error) => {
          console.error('Erro ao buscar categorias:', error);
        }
      );

      // this.categorias = this.categorias.filter(categoria => categoria.id !== id);
  }
}
}
