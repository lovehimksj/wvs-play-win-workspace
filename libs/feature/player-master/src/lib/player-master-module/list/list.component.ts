import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerServerModel } from '@wvs-play-win-workspace/backend';
import { PlayerFacadeService } from '@wvs-play-win-workspace/data-access-layer';
import { DataTableConfig, TABLE_COLUMN_LABEL_CONSTANT } from '@wvs-play-win-workspace/shared/types';
import { ModelPopUpComponent } from 'libs/shared/ui-kit/src/lib/pages/model-pop-up/model-pop-up.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataTableColumn = []
  dataTableConfig: DataTableConfig;
  filterValue: string;
  dataSource = new MatTableDataSource();
  constructor(
    private readonly _playerFacadeService : PlayerFacadeService,
    public dialog: MatDialog
  ) { 
    _playerFacadeService.setAllPlayer();
  }

  ngOnInit(): void {
    this._playerFacadeService.load_player_list$.subscribe((playerList : Array<PlayerServerModel>) => {
      if(playerList && playerList.length > 0) {
        Object.keys(playerList[0]).forEach((key: string) => {
          const dataColumn =  {
            columnLabel: key,
            columnDescription: TABLE_COLUMN_LABEL_CONSTANT[key],
            isSorting: false,
            isLink: true,
            cssClass: '',
            isImage: TABLE_COLUMN_LABEL_CONSTANT[key] === 'Avtar'
          };
          this.dataTableColumn.push(dataColumn);
        })
        this.dataSource = new MatTableDataSource(playerList);
        this.dataTableConfig = new DataTableConfig();
        this.dataTableConfig.length = playerList.length;
        this.dataTableConfig.isSelectable = false;
        this.dataTableConfig.selectionColumn = 'id';
        this.dataTableConfig.isMultipleSelect = false;
        this.dataTableConfig.isPagination = true;
        this.dataTableConfig.isFooter = true;
        this.dataTableConfig.isSort = true;
        this.dataTableConfig.isFilter = true;
        this.dataTableConfig.maxPageSize = 10;
        this.dataTableConfig.pageSizeOptions = [10, 25, 50, 75, 100];
        // this.dataTableConfig.preSelectedItems = [1,2,3,4]
      }
    })
   
  }

  applyFilter (event: Event) {
    if (this.dataTableConfig.isFilter) {
      const value = (event.target as HTMLInputElement).value;
      if(value.length > 0) {
        this.filterValue = value;
      } else if(value === '' || value === null) {
        this.filterValue = '';
      }
    }
  }

  action(event) {
    // alert(event.columnLabel +' : '+ event.columnValue);
    this.dialog.open(ModelPopUpComponent, {
      width: '80vw',
      height: '80vh'
    });
  }
}
