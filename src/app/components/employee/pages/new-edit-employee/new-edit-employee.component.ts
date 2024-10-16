import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { Employee } from '../../../../models/employee/employee';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../services/employee/employee.service';

@Component({
  selector: 'app-new-edit-employee',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule],
  templateUrl: './new-edit-employee.component.html',
  styleUrl: './new-edit-employee.component.css'
})
export class NewEditEmployeeComponent implements OnInit {

  employee: Employee = new Employee(0, "", "", "", "");

  edit = false;

  constructor(private route : ActivatedRoute, private employeeService : EmployeeService){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    console.log(id);
    if(!isNaN(id)){

      this.edit = true;
      let resultadoDaBusca = this.employeeService.buscarPorId(id);

      if(resultadoDaBusca != undefined){
        this.employee = resultadoDaBusca;
        console.log(this.employee);
      }
    }
  }

  save(){
    if(this.edit){
      this.employeeService.atualizar(this.employee);
    }else{
      let total = this.employeeService.listarTodos().length;
      this.employee.id = total + 1;
      this.employeeService.inserir(this.employee);
      console.log("IN");
    }
  }
}
