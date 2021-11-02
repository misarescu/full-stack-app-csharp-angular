import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { City } from './city';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  public pageIndex: number;
  public pageSize: number;
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];

  // this is the way that connects the paginator with the table
  public cities: MatTableDataSource<City>;
  // this is the way it was implemented in the book
  // with this approach the paginator and the table are decoupled
  // and don't work together
  //public cities: City[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }


  ngOnInit() {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = this.baseUrl + 'api/Cities';
    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString());
    console.log(params);
    this.http.get<any>(url, { params })
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.pageIndex = result.pageIndex;
        this.pageSize = result.pageSize;
        this.cities = new MatTableDataSource<City>(result.data);
      }, error => console.error(error));
  }
}
