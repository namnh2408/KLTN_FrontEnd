import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeEnumToList, FormatDateVN, FormatDaySearch } from '../../../heplers/utils';
import { Pagination } from '../../../models/condition';
import { OrderCondition } from '../../../models/order';
import { StatusNormal, StatusPaymentNormal, TypePaymentNormal } from '../../../models/status';
import { OrderService } from '../../../services/order.service';
import { OrderCountService } from '../../../services/ordercount.service';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  loading = false;
  pagination: Pagination = new Pagination();
  listPage: number[] = [];
  orderCondition: OrderCondition = new OrderCondition();
  subscriptionPagination: Subscription;
  countSub: Subscription;

  statusorder: number;

  orderStatusText = StatusNormal;
  orderStatusOptions = [];

  typePaymentText = TypePaymentNormal;
  typePaymentOptions = [];

  statusPaymentText = StatusPaymentNormal;
  statusPaymentOptions = [];

  public orders: any;

  constructor(private orderService: OrderService,
      private paginationService: PaginationService,
      private router: Router,
      private orderCountService: OrderCountService) { 
      this.pagination.CurrentDate = FormatDaySearch(new Date());
      this.buildSelection();
      this.statusorder = 1;

      this.countSub = this.orderCountService.orderCount$.subscribe(
        count => {});
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
    this.orderService.GetListOrder({
      ...this.pagination,
      ...this.orderCondition
    }).subscribe((res: any) => {
        this.orders = res.content.Orders;
        this.pagination = res.content.Pagination;
        this.getNumPage();
        this.loading = false;
      });
  }

  buildSelection() {
    ChangeEnumToList(this.orderStatusText, this.orderStatusOptions);
    ChangeEnumToList(this.typePaymentText, this.typePaymentOptions);
    ChangeEnumToList(this.statusPaymentText, this.statusPaymentOptions);
  }

  formatDateVN(input) {
    return FormatDateVN(input);
  }

  getOrderFollowStatus(statusid){
    this.statusorder = statusid;
    this.orderCondition.StatusOrderId = this.statusorder.toString();
    this.pagination.CurrentPage = 0;
    this.getList();
  }
  
  upgradeStatusOrder(orderid){
    this.orderService.UpgradeStatusOrder({OrderId: orderid}).subscribe((res: any) => {
      if(this.statusorder == 1){
        this.orderCountService.GetCountPending().subscribe((res: any) => {
          var countQuantity = res.content.CountPending;
    
          this.orderCountService.setOrderCount(countQuantity);
        });
      }

      this.getList();
    });
  }

  cancelOrder(orderid){
    this.orderService.CancelOrder({OrderId: orderid}).subscribe((res: any) => {
      this.getList();
    });
  }

  onSearch() {
    this.pagination.CurrentPage = 0;
    this.pagination.CurrentDate = FormatDaySearch(new Date());
    this.getList();
  }
    
  clearForm(){
    this.orderCondition = new OrderCondition();
    this.orderCondition.StatusOrderId = this.statusorder.toString();
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

  updateStatusPendingOrder(orderid){
    this.orderService.UpdateStatusPendingOrder(orderid).subscribe((res: any) => {
      this.getList();
    });
  }
}
