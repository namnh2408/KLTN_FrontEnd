import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeEnumToList, FormatDateVN, FormatDaySearch } from '../../../heplers/utils';
import { BreedCondition, BreedDefaultSelection } from '../../../models/breed';
import { Pagination } from '../../../models/condition';
import { StatusNormal } from '../../../models/status';
import { BreedService } from '../../../services/breed.service';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-list-breed',
  templateUrl: './list-breed.component.html',
  styleUrls: ['./list-breed.component.scss']
})
export class ListBreedComponent implements OnInit {

  loading = false;
  pagination: Pagination = new Pagination();
  listPage: number[] = [];
  breedCondition: BreedCondition = new BreedCondition();
  subscriptionPagination: Subscription;

  breedStatusText = StatusNormal;
  breedStatusOptions = []

  breedDefaultSelection: BreedDefaultSelection[];
  public breeds: any;

  constructor(private breedService: BreedService,
    private paginationService: PaginationService) { 
      this.pagination.CurrentDate = FormatDaySearch(new Date());
      this.buildSelection();
      this.getBreedDefaultSelection();
  }

  ngOnInit(): void {
    this.getList();
    this.subscriptionPagination = this.paginationService.getChangePage().subscribe(pagenumber => {
      this.pagination.CurrentPage = pagenumber;
      this.getList();
    });
  }

  getList() {
    this.loading = true;
    this.breedService.GetListBreed({
      ...this.pagination,
      ...this.breedCondition
    }).subscribe((res: any) => {
        this.breeds = res.content.Breeds;
        this.pagination = res.content.Pagination;
        this.getNumPage();
        this.loading = false;
      });
  }

  deleteBreed(Id){
    this.breedService.DeleteBreed(Id).subscribe((res: any) => {
      this.getList();
    });
  }

  buildSelection() {
    ChangeEnumToList(this.breedStatusText, this.breedStatusOptions);
  }

  formatDateVN(input) {
    return FormatDateVN(input);
  }

  getBreedDefaultSelection() {
    this.loading = true;
    this.breedService.GetNormalBreedDefault().subscribe((res: any) => {
      this.breedDefaultSelection = res.content.BreedDefaultSelection;
      this.loading = false;
    });
  }

  onSearch() {
    this.pagination.CurrentPage = 0;
    this.pagination.CurrentDate = FormatDaySearch(new Date());
    this.getList();
  }

  clearForm(){
    this.breedCondition = new BreedCondition();
    this.pagination.CurrentPage = 0;
    this.loading = true;
    this.getList();
  }

  ngOnDestroy() {
    this.subscriptionPagination.unsubscribe();
  }

  previous() {
    let value = this.pagination.CurrentPage - 1;
    if(value < 0) {
      return;
    }
    this.paginationService.changePage(value);
  }

  next() {
    let value = this.pagination.CurrentPage + 1;
    if(value >= this.pagination.TotalPage) {
      return;
    }
    this.paginationService.changePage(value);
  }

  change(number: any) {
    if(this.pagination.CurrentPage == number) {
      return;
    }
    this.paginationService.changePage(number);
  }

  getNumPage(){
    this.listPage = [];
    for(var i = 0; i < 3; i++){
      let value = this.pagination.CurrentPage - 1 + i;
      if(value > -1 && value < this.pagination.TotalPage) {
        this.listPage.push(value);
      }
    }
  }
}
