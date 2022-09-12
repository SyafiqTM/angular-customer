import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomValidator } from 'src/app/services/customvalidator';
import { NotificationService } from 'src/app/services/notification.service';
import { CrudService } from '../../services/crud.service';
import { Customer } from '../../customer';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  userForm!: FormGroup;
  customer?: Customer;

  submit: boolean = true;

  inputFirstname?: string;
  inputLastname?: string;
  inputAddress?: string;
  inputDob?: any;
  inputEmail?: string;
  inputPhone?: string;
  inputAge?: number;
  selected = 'male';

    //phone itl code
    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    selectedCountryISO:any;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.Malaysia];


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private notifyService: NotificationService,
    private cd: ChangeDetectorRef) {


  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required,Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required,Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl(''),
      dateOfBirth: new FormControl('', [Validators.required]),
    })

    const id = this.route.snapshot.params['id']
    this.crudService.getCustomerById(id).subscribe((customer) => {
      this.customer = customer;

      if (this.customer) {
        this.inputFirstname = this.customer?.firstname;
        this.inputLastname = this.customer?.lastname;
        this.inputAddress = this.customer?.address?.street ? `${this.customer?.address?.street}, ${this.customer.address?.city}` : this.customer?.address;
        this.inputDob = this.customer?.dob;
        this.inputEmail = this.customer?.email;
        this.inputPhone = this.customer?.phone?.number ? this.customer?.phone?.number : this.customer?.phone;
        this.selectedCountryISO = this.customer?.phone?.countryCode ? this.customer?.phone?.countryCode : null;
        console.log(this.selectedCountryISO);

        this.inputAge = this.customer?.age;
        this.selected = this.customer?.gender;

         this.gender?.setValue(this.selected);
        console.log(this.customer?.phone?.number);

        this.userForm.patchValue({
          phone: this.inputPhone
        })
      }
    });


    console.log(this.inputPhone);



  }

  ngAfterViewInit() {

    this.cd.detectChanges();
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
    this.inputAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.setAgeManually(event.value);
    console.log(event.value);

  }


  submitForm() {
    if (this.userForm.invalid) {
      this.submit = false;
    } else {
      this.submit = true;
    }

    if (this.submit) {

      const updateCustomer: Customer = {
        id: this.customer?.id,
        firstname: this.firstname?.value,
        lastname: this.lastname?.value,
        email: this.email?.value,
        address: this.address?.value,
        gender: this.gender?.value,
        phone: this.phone?.value,
        dob: this.dob?.value,
        age: this.age, //already return value
        created: this.customer?.created,
      };


      this.crudService.update(updateCustomer).subscribe(res => {
        this.notifyService.showSuccess("Successfully update!")
        this.router.navigate(['/crud/home/']);
      })
    }

  }
}
