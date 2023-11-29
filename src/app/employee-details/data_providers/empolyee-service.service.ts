import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { EmployeeTypeCheck } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeServiceService {
  private url="http://localhost:8080/employees"
  constructor(private http:HttpClient) {

  }
  postEmployeeDetails(data:any):Observable<any>
  {
     return this.http.post(this.url,data,{
      headers:{
        'Content-Type': 'application/json'
      }
     })
  }
  getAllEployeeDetails():Observable<EmployeeTypeCheck[]>
  {
     return this.http.get<EmployeeTypeCheck[]>(this.url+"/");
  }
  putEmployeeDetails(data:any,id:number)
  {
     return this.http.put(`${this.url}/put/${id}`,data,{
      headers:{
        'ContentType':'application/json'
      }
     })
  }
  deleteEmployeeDetails(id:number):Observable<any>
  {
    return this.http.delete(`${this.url}/${id}`,{
      responseType:'text'
    });
  }
}
