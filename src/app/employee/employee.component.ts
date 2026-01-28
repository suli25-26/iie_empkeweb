import { Component, inject } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  private readonly api = inject(EmployeeService)
  private readonly builder = inject(FormBuilder)

  employees!: any;
  showModal = false;
  employeeForm = this.builder.group({
    id: [''],
    name: ['']
  });
  addMode = true;

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees() {
    this.api.getEmployees().subscribe({
      next: (result: any) => {
        console.log(result)
        this.employees = result.data
      },
      error: (err: any) => {}
    })
  }

  save() {
    if(this.addMode) {
      this.addEmployee()
    }else {
      this.updateEmployee()
    }
  }

  addEmployee() {
    console.log('Hozzáadás...')
    console.log(this.employeeForm.value)
    this.api.addEmployee(this.employeeForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        //TODO párbeszédablakban a sikerről megeresítés
        this.employeeForm.reset()
        if(result.success) {
          this.getEmployees()
          Swal.fire({
            icon: 'success',
            title: 'Hozzáadás sikeres',
            showConfirmButton: false,
            timer: 1500,
            didRender: () => {
              this.showModal = false
            }
          })          
        }
      },
      error: (err: any) => {

      }
    })
  }
  updateEmployee() {
    this.api.updateEmployee(this.employeeForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getEmployees();
      },
      error: (err: any) => {}
    })
  }

  edit(employee: any) {
    console.log(employee)
    this.showModal = true
    this.addMode = false
    this.employeeForm.patchValue(employee)
  }

  delete(id: number) {
    // this.deleteAction(id)
    Swal.fire({
      title: "Biztos?",
      text: "Ez nem visszavonható!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Igen, törlés",
      cancelButtonText: "Mégsem"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAction(id)
      }
    });    
  }

  deleteAction(id: number) {
    console.log('Törlés következik...')
    this.api.deleteEmployee(id).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getEmployees()
        Swal.fire({
          icon: 'success',
          title: 'A törlés sikeres',
          timer: 1500
        })
      },
      error: () => {}
    })    
  }

  closeModal() {
    this.showModal=false
    this.addMode = true
    this.employeeForm.reset()
  }
}
