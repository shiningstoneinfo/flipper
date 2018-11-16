import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiStockService } from '../api/api.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Stock } from '../api/stock';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-availabe-stock',
  templateUrl: './availabe-stock.component.html',
  styleUrls: ['./availabe-stock.component.scss']
})
export class AvailabeStockComponent implements OnInit {


  public loading = new BehaviorSubject(false);
  constructor(private api:ApiStockService,private ref: ChangeDetectorRef) { }
  data: Stock[] = [];
  displayedColumns: string[] = ['sku', 'stock','category','sale_price','current_stock_qty','weight','progress'];
  dataSource = new MatTableDataSource<Stock>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Stock;
  ngOnInit() {
    this.stocks();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   // this.checkIncomingData();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  stocks(){
      this.loading.next(true);
      this.api.getStockByBranch(1,1).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          this.data = res['stocks']['data'];
          console.log(res);
          this.dataSource = new MatTableDataSource<Stock>(this.data);
        },
        _error => {
        console.error(_error);
        }
      );
    }

    checkIncomingData(){
      // this.ref.detach();
      // setInterval(() => {
      //   if(this.shared_output){
      //     this.data.push(this.shared_output);
      //     this.shared_output=null;
      //   }
      //   this.ref.detectChanges();
      // }, 1000);

    }

}
