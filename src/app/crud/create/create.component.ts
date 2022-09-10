import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/services/customvalidator';
import { CrudService } from 'src/app/services/crud.service';
import { Product } from '../../product';
import { Customer } from 'src/app/customer';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userForm: FormGroup;
  product: Product[] = [];
  submit:boolean = true;
  selected = 'male';
  ageSetting: any;

  //phone itl code
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  selectedCountryISO = 'my';
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Malaysia];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService) {

    this.userForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required,Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required,Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      age: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
    })

    this.gender?.setValue('male');
  }

  ngOnInit(): void {

  }


  get firstname() { return this.userForm.get('firstname'); }
  get lastname() { return this.userForm.get('lastname'); }
  get address() { return this.userForm.get('address'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }
  get gender() { return this.userForm.get('gender'); }
  get dob() { return this.userForm.get('dateOfBirth'); }

  get age() {
    if(this.userForm.get('age')?.value && this.userForm.get('age')?.value != "" && this.userForm.get('age')?.value !== undefined){
      return this.userForm.get('age')?.value;
    }else{
      let dobParse = new Date(this.dob?.value);
      var timeDiff = Math.abs(Date.now() - dobParse.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }

  setAgeManually(datevalue : any){
    let dobParse = new Date(datevalue);
    var timeDiff = Math.abs(Date.now() - dobParse.getTime());
    this.ageSetting = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.setAgeManually(event.value);
  }


  submitForm() {
    console.log(this.phone);

    if(this.userForm.invalid) {
      this.submit = false;
    }else{
      this.submit = true;
    }

    if(this.submit){
      const createCustomer: Customer = {
        firstname: this.firstname?.value,
        lastname: this.lastname?.value,
        email: this.email?.value,
        address: this.address?.value,
        gender: this.gender?.value,
        phone: this.phone?.value,
        dob: this.dob?.value,
        age: this.age
      };

      // this.crudService.create(createCustomer).subscribe(res => {
      //   this.router.navigate(['/crud/home/']);
      // })
    }

  }
}
