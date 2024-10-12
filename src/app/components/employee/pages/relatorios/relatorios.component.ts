import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Route } from '@angular/router';


@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [EmployeeSidebarComponent],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent {
  dataInicial!: string;
  dataFinal!: string;
  
  constructor(private router: Router) {}
  returnHome(){
    this.router.navigate(['/view-requests']);
}
  // dps tem que pegar os dados do back-end
  vendas = [
      { data: '2024-10-01', valor: 100 },
      { data: '2024-10-01', valor: 200 },
      { data: '2024-10-02', valor: 300 },
      { data: '2024-10-03', valor: 150 }
  ];


  gerarRelatorioReceitas() {
    const dataInic = new Date(this.dataInicial);
    const dataFin = new Date(this.dataFinal);
 
    const vendasAgrupadas: any = {};

    this.vendas.forEach(venda => {
      if (!vendasAgrupadas[venda.data]) {
        vendasAgrupadas[venda.data] = 0;
      }
      vendasAgrupadas[venda.data] += venda.valor;
    });

    const vendasParaTabela = [];
    for (let data in vendasAgrupadas) {
      vendasParaTabela.push([data, vendasAgrupadas[data]]);
    }

    const doc = new jsPDF();
    doc.text('Relatório de Receita', 14, 16);
    doc.text(`Período: ${this.dataInicial} a ${this.dataFinal}`, 14, 24);

    (doc as any).autoTable({
      head: [['Data', 'Total de Vendas']],
      body: vendasParaTabela,
      startY: 30
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}
