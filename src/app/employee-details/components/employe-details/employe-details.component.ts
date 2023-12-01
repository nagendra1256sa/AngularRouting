import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmpolyeeServiceService } from '../../data_providers/empolyee-service.service';
import { EmployeeTypeCheck } from '../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { EmpFormComponent } from '../emp-form/emp-form.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employe-details',
  templateUrl: './employe-details.component.html',
  styleUrls: ['./employe-details.component.scss']
})
export class EmployeDetailsComponent implements OnInit {
  horizentalView:MatSnackBarHorizontalPosition='center';
  verticalView:MatSnackBarVerticalPosition='top';
  constructor(private EmployeeService:EmpolyeeServiceService,private MatDialog:MatDialog,private snackbar:MatSnackBar)
  {
     
  }
  ngOnInit(): void {
     this.getEmployeeDetails();
  }
  displayedColumns: string[] = ['id',
  'firstName',
  'lastName',
  'dob',
  'email',
  'gender',
  'department',
  'experience',
  'address',
  'state',
  'pincode',
  'martialStatus',
  'phoneNumber','action'];
  data: EmployeeTypeCheck[]=[];
  getEmployeeDetails()
  {
     this.EmployeeService.getAllEployeeDetails().subscribe({
      next:(val:EmployeeTypeCheck[])=>{
        this.data=val
        console.log(val);
      },
      error:(err)=>console.log(err)
      
     })
  }
  editEmployeeDetails(data:any)
  {
    this.MatDialog.open(EmpFormComponent,{
      data:data
    }).afterClosed().subscribe({
      next:()=>{
        this.getEmployeeDetails();     
      }
    })
  }
  deleteEmployeeData(id:number)
  {
    this.EmployeeService.deleteEmployeeDetails(id).subscribe({
      next:()=>
      {
        console.log("wewr");
        
        this.getEmployeeDetails();
        this.snackbar.open("Employee details successfully deleted",'close',{
          horizontalPosition:this.horizentalView,
          verticalPosition:this.verticalView,
          duration:3000
        })
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }

}
