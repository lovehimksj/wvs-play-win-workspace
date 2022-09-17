import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DataTableConfig } from '@wvs-play-win-workspace/shared/types';


@Component ({
  selector: 'wvs-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input () displayedColumnsConfig: any[];
  @Input () config: DataTableConfig;
  @Input () filterKey: string;
  @Input () dataSource: any;
  @Output () clickedItem: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild (MatSort, { static: false }) sort: MatSort;
  @ViewChild (MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [];
  selection: SelectionModel<any> = new SelectionModel<any>();
  pageEvent: PageEvent;
  sliceCount: number;

  constructor () {
  }

  ngOnChanges (changes: SimpleChanges): void {
    if(changes.filterKey) {
      if(changes.filterKey.currentValue !== changes.filterKey.previousValue) {
        this.filterData(changes.filterKey.currentValue);
      }
    }
  }
  ngOnInit (): void {
    this.sliceCount = this.config.isSelectable ? 1 : 0;
    this.displayedColumns = this.displayedColumnsConfig.map ((value: any, index) => value.columnLabel);
    if (this.config.isSelectable) {
      this.selection = new SelectionModel<any> (this.config.isMultipleSelect, [
        ...this.dataSource?.data.filter(row => this.config.preSelectedItems.indexOf(row[this.config.selectionColumn]) > -1)
      ]);
      this.selection.changed.subscribe(value => {console.log(value.added)});
    }
  }

  ngAfterViewInit (): void {
    if (this.config.isPagination) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.config.isSort) {
      this.dataSource.sort = this.sort;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected () {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle () {
    this.isAllSelected () ?
      this.selection.clear () :
      this.dataSource.data.forEach (row => this.selection.select (row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel (row?: any): string {
    if (!row) {
      return `${this.isAllSelected () ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected (row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter (event: Event) {
    if (this.config.isFilter) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim ().toLowerCase ();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage ();
      }
    }
  }

  private filterData(value: string) {
    let key;
    if(value === null || value === '') {
      this.dataSource.filter = '';
    }
    if (this.config.isFilter && value && key !== value) {
      key = value;
      this.dataSource.filter = value.trim ().toLowerCase ();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage ();
      }
    }
  }

  selectMe (row: any) {
    console.log(row);
  }

  onImgError(event){
    event.target.src = './assets/images/avatar.png'
  }

  clickCallBack(event : Event, columnLabel: string, columnValue: string) {
    this.clickedItem.emit({columnLabel: columnLabel, columnValue: columnValue})
  }
}
