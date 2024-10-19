import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { Employee } from '../../../../models/employee/employee';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-edit-employee',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './new-edit-employee.component.html',
  styleUrl: './new-edit-employee.component.css'
})
export class NewEditEmployeeComponent implements OnInit {

  employee: Employee = new Employee(0, "", "", "", "");
  edit = false;
  errorEmpty = false;
  errorDate = false;

  constructor(private route : ActivatedRoute, private employeeService : EmployeeService, private router : Router){}

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
    
    if(!this.hasErrors()){
      if(this.edit){
        this.employeeService.atualizar(this.employee);
      }else{
        let total = this.employeeService.listarTodos().length;
        this.employee.id = total + 1;
        this.employeeService.inserir(this.employee);        
      }
      this.router.navigate(['/employees']);
    }

  }

  hasErrors(){
    if(this.isEmpty(this.employee)){
      this.errorEmpty = true;
      return true;
    }
    this.errorEmpty = false;
    if(this.dateErrors(this.employee.birthDate)){
      this.errorDate = true;
      return true;
    }
    this.errorDate = false;
    return false;
  }

  isEmpty(emp: Employee) : boolean{
    for (const atr in emp) {
      if (emp.hasOwnProperty(atr) && atr !== '_password' && atr !== 'id') {
          if ((emp as any)[atr] === '') {
              return true;
          }
      }
    }
    return false;
  }

  dateErrors(date : string){
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    
    if(!dateRegex.test(date)){
      return true;
    }
    
    let day = parseInt(date.split('/')[0]);
    let month = parseInt(date.split('/')[1]);
    let year = parseInt(date.split('/')[2]);

    if(day > 31 || day < 1 || month > 12 || month < 1 || year > 2024 || year < 1900){
      return true;
    }

    if(day > 30 && !(month in [1, 3, 5, 7, 8, 10 , 12])){
      return true;
    }

    if(day > 28 && month == 2){
      return true;
    }

    return false;
  }
}
