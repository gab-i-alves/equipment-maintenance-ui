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
  imports: [EmployeeSidebarComponent, FormsModule],
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
      { data: '2024-10-01', valor: 100, categoria:"Notebook"},
      { data: '2024-10-01', valor: 200, categoria:"Desktop" },
      { data: '2024-10-02', valor: 300, categoria:"Teclado" },
      { data: '2024-10-03', valor: 50, categoria:"Mouse" },
      { data: '2024-10-04', valor: 170, categoria:"Teclado" },
      { data: '2024-10-06', valor: 400, categoria:"Impressora" }
  ];

  gerarRelatorioReceitas() {
    if (this.dataInicial === undefined){
      this.dataInicial = '2024-09-02'; //data fictícia de abertura da empresa 
    }
    if (this.dataFinal === undefined){
      this.dataFinal = new Date().toString();
    }

    const dataFin = (new Date(this.dataFinal)).toLocaleDateString();
    const dataInic = (new Date(this.dataInicial)).toLocaleDateString();
 
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
    doc.text(`Período: ${dataInic} a ${dataFin}`, 14, 24);

    (doc as any).autoTable({
      head: [['Data', 'Total de Vendas']],
      body: vendasParaTabela,
      startY: 30
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }


  gerarRelatorioReceitasPorCategoria() {
    const dataInic = (new Date('2024-09-02')).toLocaleDateString();
    const dataFin = (new Date).toLocaleDateString();
 
    const vendasAgrupadas: any = {};

    this.vendas.forEach(venda => {
      if (!vendasAgrupadas[venda.categoria]) {
        vendasAgrupadas[venda.categoria] = 0;
      }
      vendasAgrupadas[venda.categoria] += venda.valor;
    });

    const vendasParaTabela = [];
    for (let categoria in vendasAgrupadas) {
      vendasParaTabela.push([categoria, vendasAgrupadas[categoria]]);
    }

    const doc = new jsPDF();
    doc.text('Relatório de Receita por Categoria', 14, 16);
    doc.text(`Período: ${dataInic} a ${dataFin}`, 14, 24);

    (doc as any).autoTable({
      head: [['Categoria', 'Total de Vendas']],
      body: vendasParaTabela,
      startY: 30
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}
