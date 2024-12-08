import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitacaoRequest } from '../../../../models/solicitacaoRequest';
import { AuthService } from '../../../../services/auth/auth.service';
import * as bootstrap from 'bootstrap';
import { MaintenanceService } from '../../../../services/maintenance/maintenance.service';

@Component({
  selector: 'app-do-maintence',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, CommonModule],
  templateUrl: './do-maintence.component.html',
  styleUrl: './do-maintence.component.css'
})
export class DoMaintenceComponent implements OnInit {
  request: SolicitacaoRequest | null = null;
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';
  funcionarios: any[] = [];
  selectedFuncionario: number | null = null;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation?.extras.state) {
      this.request = navigation.extras.state['request'];
      this.loadFuncionarios();
    }
  }

  loadFuncionarios() {
    this.maintenanceService.listarFuncionarios().subscribe(
      (data) => {
        this.funcionarios = data;
      }
    );
  }

  efetuarManutencao() {
    if (!this.request || !this.descricaoManutencao || !this.orientacoesCliente) {
      return;
    }

    const currentEmployee = this.authService.getCurrentEmployee();
    
    this.maintenanceService.efetuarManutencao(
      this.request.id,
      this.descricaoManutencao,
      this.orientacoesCliente,
      currentEmployee.id
    ).subscribe(
      (response) => {
        this.returnHome();
      },
      (error) => {
        console.error('Erro ao efetuar manutenção:', error);
      }
    );
  }

  redirecionarManutencao() {
    if (!this.request || !this.selectedFuncionario) {
      return;
    }

    const currentEmployee = this.authService.getCurrentEmployee();

    this.maintenanceService.redirecionarManutencao(
      this.request.id,
      currentEmployee.id,
      this.selectedFuncionario
    ).subscribe(
      (response) => {
        this.returnHome();
      },
      (error) => {
        console.error('Erro ao redirecionar manutenção:', error);
      }
    );
  }

  returnHome() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach((modal) => {
      const bsModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
      bsModal.hide();
    });
    this.closeAllModals();
    this.router.navigate(['/view-requests']);
  }

  closeAllModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach((modal) => {
      const bsModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
      bsModal.hide();
    });
    document.body.classList.remove('modal-open');
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.remove());
  }
}