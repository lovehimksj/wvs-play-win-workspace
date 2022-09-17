/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

export class DataTableConfig {
  isSelectable: boolean;
  isSort: boolean;
  isFilter: boolean;
  isMultipleSelect: boolean;
  isPagination: boolean;
  maxPageSize: number;
  isFooter: boolean;
  length: number;
  pageSizeOptions: number[] = [];
  preSelectedItems: number[] = [];
  selectionColumn: string;
}
