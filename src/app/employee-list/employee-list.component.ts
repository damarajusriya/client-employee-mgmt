import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: any[];

  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit(): void {
    console.log('Getting Employees list');
    
    let isAuthenticated = localStorage.getItem('auth');

    if (isAuthenticated === 'false') {
      this.router.navigate(['/']);
    }
    
    this.getAllEmployees();
  }

  getAllEmployees() {    
    this.employeeService.getEmployeesList().subscribe((snaps) => {
      this.employees = snaps;
  });
      console.log(this.employees)
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.getAllEmployees();
        },
        error => console.log(error));
  }

  updateEmployee(id: number) {
    this.employeeService.updateEmployee(id, {})
      .subscribe(
        data => {
          console.log(data);
          this.getAllEmployees();
        },
        error => console.log(error));
  }

  handleLogout() {
    localStorage.setItem('auth', 'false');
    this.router.navigate(['/']);
  }

}
