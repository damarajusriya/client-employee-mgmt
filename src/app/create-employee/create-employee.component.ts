import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

    ngOnInit(): void {
      let isAuthenticated = localStorage.getItem('auth');
  
      if (isAuthenticated === 'false') {
        this.router.navigate(['/']);
      }
    }

  // newEmployee(): void {
  //   this.submitted = false;
  //   this.employee = new Employee();
  // }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => alert('Employee Created'), error => {alert(error)});
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

  handleLogout() {
    localStorage.setItem('auth', 'false');
    this.router.navigate(['/']);
  }

}