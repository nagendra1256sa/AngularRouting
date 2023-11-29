import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpFormComponent } from '../emp-form/emp-form.component';
import { EmployeDetailsComponent } from '../employe-details/employe-details.component';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent {
 public openEDetails:boolean=false
  constructor(public dialog: MatDialog) {}
  @ViewChild(EmployeDetailsComponent) 
  child!:EmployeDetailsComponent;
  openDialog() {
    const dialogRef=this.dialog.open(EmpFormComponent,{
      width:'600px',
      panelClass: ['custommodal'],
    });
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.child.getEmployeeDetails();
      }
    })
  }
  openDetails()
  {
     this.openEDetails=true;
  }
}
