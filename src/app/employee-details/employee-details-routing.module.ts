import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { EmpFormComponent } from './components/emp-form/emp-form.component';

const routes: Routes = [
  {
    path:"fgd",component:EmpFormComponent
  },
  {
    path:"",component:EmpDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsRoutingModule { }
