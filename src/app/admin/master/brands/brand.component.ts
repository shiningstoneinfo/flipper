import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, DoCheck, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, isEmpty } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Brand } from './api/brand';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../state/master-state';
import { AsyncPipe } from '@angular/common';
import { Details } from '../../../details/details';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../../details/details.service';
import { Toast } from '../../../common/core/ui/toast.service';
import { Master } from '../master';
import { MasterModelService } from '../master-model.service';
import { ApiBrandService } from './api/api.service';

@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./brand.component.scss"]
})
export class RemoveBrandDialog {
  cat_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api: ApiBrandService,
    public dialogRef: MatDialogRef<RemoveBrandDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    deleteBrand(){
      this.loading.next(true);
        this.data.forEach(element => {
          this.api
          .delete(element.Brand_id).subscribe(
              res => {
                  if(res.status=='success'){
                    this.dialogRef.close({status:'success'});
                    this.msterModelService.update({loading: false, categories: res['Brand']['data']?res['Brand']['data']:[]});
                  }
              },
              _error => {
                this.toast.open('Nothing deleted!');
                this.dialogRef.close({status:'failed'});
                console.error(_error);
              }
          );
        });

    }



  close(): void {
    this.dialogRef.close({status:'none'});
  }
}
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements   OnInit {

  public loading = new BehaviorSubject(false);
  can_delete=false;

  constructor(private msterModelService:MasterModelService,public dialog: MatDialog,private detailsService:DetailsService,private api:ApiBrandService,private ref: ChangeDetectorRef) { }
  data: Brand[] = [];
  displayedColumns: string[] = ['select', 'name','description'];
  dataSource = new MatTableDataSource<Brand>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  master$: Observable<Master>;

  subscription: Observable<Details>;
  details$: Observable<Details>;
  selection = new SelectionModel<Brand>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscription = this.details$ = this.detailsService.details$;

    this.master$ = this.msterModelService.master$;

        this.master$.subscribe(res=>{
          if(res.brands.length  > 0){
            this.data=res.brands;
            this.dataSource.data=this.data;
          }
      });

  }
  openDetails(title='New Brand',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-master',component:'app-Brand',action:action,detailsVisible:true});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RemoveBrandDialog, {
        width: '400px',
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.status=="success"){
          this.selection = new SelectionModel<Brand>(true, []);
         }
      });

    }

  }



  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' currently.';
  }
}
