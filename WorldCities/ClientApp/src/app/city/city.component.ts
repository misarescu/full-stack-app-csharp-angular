import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { City } from './city';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];

  // this is the way that connects the paginator with the table
  public cities: MatTableDataSource<City>;
  // this is the way it was implemented in the book
  // with this approach the paginator and the table are decoupled
  // and don't work together
  //public cities: City[];

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl:string) { }


  ngOnInit() {
    this.http.get<City[]>(this.baseUrl + 'api/Cities')
      .subscribe(result => {
        this.cities = new MatTableDataSource(result);
        this.cities.paginator = this.paginator;
      }, error => console.log(error));
    
  }
 
}
