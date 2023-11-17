import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerServerModel } from '@wvs-play-win-workspace/backend';
import { PlayerFacadeService } from '@wvs-play-win-workspace/data-access-layer';
import {
  DataTableConfig,
  PlayerMasterPageControl,
  TABLE_COLUMN_LABEL_CONSTANT,
} from '@wvs-play-win-workspace/shared/types';
import { ModelPopUpComponent } from '@wvs-play-win-workspace/shared/ui-kit';

@Component({
  selector: 'wvs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  entity: PlayerMasterPageControl;
  dataTableColumn = [];
  dataTableConfig: DataTableConfig;
  filterValue: string;
  dataSource = new MatTableDataSource();
  actionItem = [
    {
        icon: 'edit',
        iconClass:'material-icons-outlined',
        actionType: 'edit',
        matTooltip:'Edit Player',
        isMenu: false,
        isDisable: false
    },
    {
        icon: 'delete', 
        actionType: 'delete', 
        iconClass:'material-icons-outlined', 
        matTooltip:'Delete Player',
        isMenu: false,
        isDisable: false
    },
    {
        icon: 'more_vert',
        actionType: 'menu',
        matTooltip:'More Option',
        iconClass:'material-icons-outlined',
        isMenu: true,
        menuItem: [
                {
                    name: 'Send Email',
                    icon: 'send',
                    actionType: 'sendEmail',
                    iconClass:'material-icons-outlined',
                    isDisable: false
                },
                {
                    name: 'Send Message',
                    icon: 'sms',
                    actionType: 'sendSms',
                    iconClass:'material-icons-outlined',
                    isDisable: true
                },
                {
                  name: 'Push Nitin Notification',
                  icon: 'notifications',
                  actionType: 'sendNotifications',
                  iconClass:'material-icons-outlined',
                  isDisable: true
                },
                {
                  name: 'Print Ticket',
                  iconClass:'material-icons-outlined',
                  actionType: 'print',
                  isDisable: true
                }
            ]
    }
  ]
  constructor(
    private readonly _playerFacadeService: PlayerFacadeService,
    public dialog: MatDialog
  ) {
    _playerFacadeService.setAllPlayer();
    this.entity = new PlayerMasterPageControl();
  }

  ngOnInit(): void {
    this._playerFacadeService.load_player_list$.subscribe(
      (playerList: Array<PlayerServerModel>) => {
        if (playerList && playerList.length > 0) {
          Object.keys(playerList[0]).forEach((key: string) => {
            if(TABLE_COLUMN_LABEL_CONSTANT[key] !== 'Avtar') {
              const dataColumn = {
                columnLabel: key,
                columnDescription: TABLE_COLUMN_LABEL_CONSTANT[key],
                isSorting: false,
                isLink: false,
                cssClass: key,
                isImage: TABLE_COLUMN_LABEL_CONSTANT[key] === 'Avtar',
              };
              this.dataTableColumn.push(dataColumn);
            }
          });
          this.dataTableColumn = this.dataTableColumn.reduce((acc, element) => {
            if (element.columnDescription === 'Id') {
              return [element, ...acc];
            }
            return [...acc, element];
          }, []);
          this.dataTableColumn.push({
            columnLabel: 'Action',
            columnDescription: 'Action',
            isSorting: false,
            isLink: false,
            cssClass: 'action',
            isImage: false,
          });
          this.dataSource = new MatTableDataSource(playerList);
          this.dataTableConfig = new DataTableConfig();
          this.dataTableConfig.dataTableTitle = 'Available player details list';
          this.dataTableConfig.actionItem = this.actionItem;
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
      }
    );
  }

  applyFilter(event: Event) {
    if (this.dataTableConfig.isFilter) {
      const value = (event.target as HTMLInputElement).value;
      if (value.length > 0) {
        this.filterValue = value;
      } else if (value === '' || value === null) {
        this.filterValue = '';
      }
    }
  }

  action(event) {
    // alert(event.columnLabel +' : '+ event.columnValue);
    console.log(event)
    this.dialog.open(ModelPopUpComponent, {
      width: '80vw',
      height: '80vh',
    });
  }
}
