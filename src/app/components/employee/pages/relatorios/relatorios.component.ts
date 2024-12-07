import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../../employee-sidebar/employee-sidebar.component';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Route } from '@angular/router';
import { RelatoriosService } from '../../../../services/relatorios/relatorios.service';
import { data } from 'jquery';
import { RelatorioRequest } from '../../../../models/relatorioRequest';


@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent {
  dataInicial!: Date;
  dataFinal!: Date;
  requestRelatorio: RelatorioRequest[] = []

  constructor(private router: Router, private relatorioService: RelatoriosService) {}

  returnHome(){
    this.router.navigate(['/view-requests']);
  }
  
  gerarRelatorioReceitas() {
    const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Data inválida');
    }
    return date.toISOString().split('T')[0];
  };
    if (this.dataInicial === undefined || this.dataFinal === undefined) {
      this.dataInicial = new Date('2024-09-02');
      this.dataFinal = new Date(); 

      const dateInic = formatDate(this.dataInicial);
      const dateFin = formatDate(this.dataFinal);
      this.gerarWithoutDate(dateInic, dateFin)
    } else {
      this.gerarWithDate(this.dataInicial, this.dataFinal)
    }

  }

  gerarWithoutDate(dateInic: string, dateFin: string) {
       this.relatorioService.getListServicosByDateCategoria(dateInic, dateFin).subscribe(
          (data: RelatorioRequest[]) => {
            this.requestRelatorio = data;

            const dataFin = (new Date(this.dataFinal)).toLocaleDateString();
            const dataInic = (new Date(this.dataInicial)).toLocaleDateString();

            const mvtosAgrupadas: any = {};

            this.requestRelatorio.forEach(movimento => {
              const dataPagamento = new Date(movimento.dataHoraPagamento).toISOString().split('T')[0]; 
              if (!mvtosAgrupadas[dataPagamento]) {
                mvtosAgrupadas[dataPagamento] = 0;
              }
              mvtosAgrupadas[dataPagamento] += movimento.valorOrcamentoAprovado;
            });


            const vendasParaTabela = [];
            for (let data in mvtosAgrupadas) {
              const dataFormatada = new Date(data).toLocaleDateString('pt-BR'); 
              const valorFormatado = mvtosAgrupadas[data].toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              });
              vendasParaTabela.push([dataFormatada, 'R$' + valorFormatado]);
            }

            const doc = new jsPDF();
            doc.text('Relatório de Receita', 14, 16);
            doc.text(`Período: ${dataInic} a ${dataFin}`, 14, 24);

            (doc as any).autoTable({
              head: [['Data', 'Total de Vendas']],
              body: vendasParaTabela,
              startY: 30,
            });

            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);
          }
        );
  }


   gerarWithDate(dateInic: Date, dateFin: Date) {
       this.relatorioService.getListServicosByDate(dateInic, dateFin).subscribe(
          (data: RelatorioRequest[]) => {
            this.requestRelatorio = data;

            const dataFin = (new Date(this.dataFinal)).toLocaleDateString();
            const dataInic = (new Date(this.dataInicial)).toLocaleDateString();

            const mvtosAgrupadas: any = {};

            this.requestRelatorio.forEach(movimento => {
              const dataPagamento = new Date(movimento.dataHoraPagamento).toISOString().split('T')[0]; 
              if (!mvtosAgrupadas[dataPagamento]) {
                mvtosAgrupadas[dataPagamento] = 0;
              }
              mvtosAgrupadas[dataPagamento] += movimento.valorOrcamentoAprovado;
            });


            const vendasParaTabela = [];
            for (let data in mvtosAgrupadas) {
              const dataFormatada = new Date(data).toLocaleDateString('pt-BR'); 
              const valorFormatado = mvtosAgrupadas[data].toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              });
              vendasParaTabela.push([dataFormatada, valorFormatado]);
            }

            const doc = new jsPDF();
            doc.text('Relatório de Receita', 14, 16);
            doc.text(`Período: ${dataInic} a ${dataFin}`, 14, 24);

            (doc as any).autoTable({
              head: [['Data', 'Total de Vendas']],
              body: vendasParaTabela,
              startY: 30,
            });

            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);
          }
        );
  }
  


  gerarRelatorioReceitasPorCategoria() {
    let dataInicialCategoria = new Date('2024-09-02');
    let dataFinalCategoria = new Date(); 

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const dateInic = formatDate(dataInicialCategoria);
    const dateFin = formatDate(dataFinalCategoria);

    this.relatorioService.getListServicosByDateCategoria(dateInic, dateFin).subscribe(
      (vendas: RelatorioRequest[]) => {
        console.log("Vendas recebidas:", vendas);

        const dataInic = new Date(dataInicialCategoria).toLocaleDateString('pt-BR');
        const dataFin = new Date(dataFinalCategoria).toLocaleDateString('pt-BR');


        const vendasAgrupadas: any = {};
        vendas.forEach(venda => {
          if (venda.valorOrcamentoAprovado > 0) {
            if (!vendasAgrupadas[venda.categoriaEquipamento]) {
              vendasAgrupadas[venda.categoriaEquipamento] = 0;
            }
            vendasAgrupadas[venda.categoriaEquipamento] += venda.valorOrcamentoAprovado;
          }
        });

        console.log("Vendas agrupadas por categoria:", vendasAgrupadas);


        const vendasParaTabela = [];
        for (let categoria in vendasAgrupadas) {
          const valorFormatado = vendasAgrupadas[categoria].toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
          });
          vendasParaTabela.push([categoria, valorFormatado]);
        }

        const doc = new jsPDF();
        doc.text('Relatório de Receita por Categoria', 14, 16);
        doc.text(`Período: ${dataInic} a ${dataFin}`, 14, 24);

        (doc as any).autoTable({
          head: [['Categoria', 'Total de Vendas']],
          body: vendasParaTabela,
          startY: 30,
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      }
    );
  }

}
