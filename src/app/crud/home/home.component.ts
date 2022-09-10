import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';
import { Customer } from '../../customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private router: Router,
    public crudService: CrudService) { }

  ngOnInit() {

    this.crudService.getAll().subscribe((customers)=>{
      customers.map((customer)=>{
        customer.address = customer.address?.street ? `${customer.address?.street}, ${customer.address?.city}` : customer.address;
      })
      this.customers = customers;
    })
  }


  updateCustomer(customer: Customer){
    this.router.navigate(['/crud/update', customer.id]);
  }

  deleteCustomer(customer: Customer){
    this.crudService.delete(customer).subscribe(
      () => (this.customers = this.customers.filter((t) => t.id !== customer.id))
    );
  }

  confirmDelete(customer: Customer){
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'You will not be able to recover customer data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#1266f1',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.deleteCustomer(customer);
        Swal.fire({
          title: 'Deleted!',
          text: 'Customer record successfully deleted',
          icon: 'success',
          confirmButtonColor: '#1266f1'
        })
      }
    })
  }
}
