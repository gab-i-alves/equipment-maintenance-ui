import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeSidebarComponent } from "../../employee-sidebar/employee-sidebar.component";
import { Employee } from '../../../../models/employee/employee';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask'
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-new-edit-employee',
  standalone: true,
  imports: [EmployeeSidebarComponent, FormsModule, RouterModule, CommonModule, NgxMaskDirective],
  templateUrl: './new-edit-employee.component.html',
  styleUrl: './new-edit-employee.component.css'
})
export class NewEditEmployeeComponent implements OnInit {

  employee: Employee = new Employee(0, "", "", "", "", true);
  edit = false;
  errorEmpty = false;
  errorDate = false;
  errorMessage = "";

  constructor(private route : ActivatedRoute, private employeeService : EmployeeService, private router : Router){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    console.log(id);
    if(!isNaN(id)){
      this.edit = true;
      const employee = this.buscarPorId(id);
      if (employee != null) {
        this.employee = employee;
      }
    }
  }

  save(){
    if(!this.hasErrors()){
      console.log(this.employee);
      if(this.edit){
        this.employeeService.atualizar(this.employee).subscribe({
          next: () => {
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            console.log(err.status + " // " + err.error);
            this.errorMessage = err.error;
            this.openErrorModal();
          }
        });
            } else {
        this.employeeService.inserir(this.employee).subscribe({
          next: () => {
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            console.log(err.status + " // " + err.error);
            this.errorMessage = err.error;
            this.openErrorModal();
          }
        });
      }
    }

  }

  hasErrors(){
    if(this.isEmpty(this.employee)){
      this.errorEmpty = true;
      return true;
    }
    this.errorEmpty = false;
    if(this.dateErrors(this.employee.dataNascimento)){
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
    console.log(date);
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

  buscarPorId(id: number): void {
    this.employeeService.buscarPorId(id).subscribe({
      next: (data: Employee | null) => {
        if (data != null) {
          this.employee = data;
        }
      },
      error: (err) => {
        console.log(err.status + " // " + err.message);
      }
    });
  }

  openErrorModal() {
    const errorModalElement = document.getElementById('errorModal');
    if (errorModalElement) {
      const errorModal = new Modal(errorModalElement);
      errorModal.show();
    }
  }

}


