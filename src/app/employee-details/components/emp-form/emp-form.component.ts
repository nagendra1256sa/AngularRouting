import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpolyeeServiceService } from '../../data_providers/empolyee-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit{
   empForm!:FormGroup;

   public Gender=[
       {value:'Male',viewValue:"Male"},
       {value:'Female',viewValue:"Female"}
   ]
   public MStatus=[
    {value:'Married',viewValue:'Married'},
    {
      value:'Unmarried',viewValue:"Unmarried"
    }
   ]
   public  indianStates: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
   constructor(private fb:FormBuilder,
    private empService:EmpolyeeServiceService,
    private matdialogRef:MatDialogRef<EmpFormComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ){
     this.empForm=this.fb.group({
      firstName:new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      experience:new FormControl('',[Validators.required,Validators.pattern(/^[^ \W][0-9]*$/)]),
      dob: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      state: new FormControl("",[Validators.required]),
      pincode:new FormControl('',[Validators.required,Validators.pattern(/^[^s]/)]),
      address:new FormControl('',[Validators.required]),
      department:new FormControl('',[Validators.required,Validators.pattern(/^[^\s\W][\s\S]*$/)]),
      martialStatus:new FormControl('',[Validators.required]),
      // phoneNumber: new FormArray([new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d{9}$/)])]),
      phoneNumber:new FormControl("",[Validators.required,Validators.pattern(/^[1-9]\d{9}$/)])
     })
   }
   horizentalPosition:MatSnackBarHorizontalPosition='center'
   verticalPosition:MatSnackBarVerticalPosition='top'
  //  addPNumber()
  //  {
  //    const control=new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d{9}$/)]);
  //    (this.empForm.get('phoneNumber') as FormArray).push(control)
  //  }
  //  get phoneNumberControls()
  //  {
  //    return this.empForm.get('phoneNumber')as FormArray
  ngOnInit(): void {
    if(this.data)
    {
      this.empForm.get('firstName')?.setValue(this.data.firstName);
      this.empForm.get('lastName')?.setValue(this.data.lastName);
      this.empForm.get('dob')?.setValue(this.data.dob);
      this.empForm.get('gender')?.setValue(this.data.gender);
      this.empForm.get('email')?.setValue(this.data.email);
      this.empForm.get('department')?.setValue(this.data.department);
      this.empForm.get('experience')?.setValue(this.data.experience);
      this.empForm.get('martialStatus')?.setValue(this.data.martialStatus);
      this.empForm.get('state')?.setValue(this.data.state);
      this.empForm.get('pincode')?.setValue(this.data.pincode);
      this.empForm.get('address')?.setValue(this.data.address);
      this.empForm.get('phoneNumber')?.setValue(this.data.phoneNumber)
       
    }
  }
  //  }
   submitForm()
   {
    // console.log(this.empForm.value);
    if(this.data)
    {
      console.log(this.data.id);
      
      if(this.empForm.valid)
      {
        this.empService.putEmployeeDetails(this.empForm.value,this.data.id).subscribe({
          next:()=>{
            this.matdialogRef.close();   
            this.openSnackBar();
          },error:(err)=>{
            console.log(err);
            
          }
        })
      }
    }
    else{
      if(this.empForm.valid)
      {
        this.empService.postEmployeeDetails(this.empForm.value).subscribe({
         next:(res)=>{
          
            this.matdialogRef.close();   
            this.openSnackBar();
         }
        })
    }
     }
   }
  //  deleteNumber(index:number)
  //  {
  //    const myArray=this.empForm.get('phoneNumber') as FormArray
  //    if(myArray&&myArray.length>index)
  //    {
  //      myArray.removeAt(index)
  //    }
  //  }
  openSnackBar()
  {
      if(this.data)
      {
        this.snackBar.open('Employee Details Update successfully done','close',{
          horizontalPosition:this.horizentalPosition,
          verticalPosition:this.verticalPosition,
          duration:3000
         })
      }
      else
      {
        this.snackBar.open('Employee registration is successfully done','close',{
          horizontalPosition:this.horizentalPosition,
          verticalPosition:this.verticalPosition,
          duration:3000
         })
      }
  }

}
