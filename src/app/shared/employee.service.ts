import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  private readonly http = inject(HttpClient)
  private readonly host = "http://localhost:8000/api/"

  getEmployees() {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const url = this.host + 'employees'
    return this.http.get(url, { headers })
  }

  addEmployee(employee: any) {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const url = this.host + 'employees'
    return this.http.post(url, employee, { headers })
  }

  updateEmployee(employee: any) {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const url = this.host + 'employees/' + employee.id
    return this.http.put(url, employee, { headers }) 
  }
  deleteEmployee(id: number) {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const url = this.host + 'employees/' + id
    return this.http.delete(url, { headers }) 
  }

}
