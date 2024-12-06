import { Component, OnInit } from '@angular/core';
import { CategoriaDeEquipamento } from '../../../../models/categoriaDeEquipamento/categoriaDeEquipamento.model';
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
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListarCategoriaComponent implements OnInit {
  categorias: CategoriaDeEquipamento[] = [];
  dataTable: any;
  errorMessage: string = '';
  selectedId! : number;
  constructor(private categoriaService: EquipmentCategoryService) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!$.fn.dataTable.isDataTable('#tableSolic')) {
        new DataTable('#tableSolic', {
          responsive: true,
          paging: true,
          pageLength: 7,
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
    }, 100);
  }

  removerCategoria() {
    this.categoriaService.remover(this.selectedId).subscribe({
      complete: () => { 
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.openErrorModal();
      }
    });
  }

  listarTodos() {
    this.categoriaService.listarTodos().subscribe({
      next: (data: CategoriaDeEquipamento[] | null) => {
        if(data != null){
          this.categorias = data;
        }
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.openErrorModal();
      }
    })
  }

  openErrorModal() {
    const errorModalElement = document.getElementById('errorModal');
    if (errorModalElement) {
      const errorModal = new Modal(errorModalElement);
      errorModal.show();
    }
  }

  openRemoveModal(id: number) {
    this.selectedId = id;
  }
  
}
