import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from 'src/app/customer';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // product: Product;
  customer ?: Customer;
  pullAddress : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router ,
    private crudService: CrudService) {
     }

  ngOnInit() {

      const id = this.route.snapshot.params['id']
      this.crudService.getCustomerById(id).subscribe((customer) => {

        this.customer = customer;
        // console.log(this.customer.address.street);
        if(this.customer?.address?.street){
          this.pullAddress =  `${this.customer?.address?.street}, ${this.customer.address?.city}`;
        }else{
          this.pullAddress = this.customer?.address;
        }
      });
  }

}
