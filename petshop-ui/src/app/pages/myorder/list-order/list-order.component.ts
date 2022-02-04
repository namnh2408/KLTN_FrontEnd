import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatDateVN } from 'src/app/heplers/utils';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss'],
})
export class ListOrderComponent implements OnInit {

  orders : any;
  loading = false;
  existed: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { 
      this.existed = 0;
    }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.GetListHistoryOrder();

    if( this.existed == 1){
      let target = document.getElementById('target');
      this.scroll(target);
    }
    else{
      let target = document.getElementById('target1');
    this.scroll(target);
    }
    
  }

  GetListHistoryOrder(){
    this.loading = true;

    this.orderService.GetListHistoryOrder().subscribe((res:any) =>{
      if(res.result == 0){
        this.existed = 0;
      }
      else{
        this.orders = res.content.Orders;
        this.existed = 1;
      }
      

      this.loading = false;
    })
  }

  CancelOrder(OrderId: any){
    this.loading = true;

    this.orderService.CancelOrder(OrderId).subscribe((res: any) =>{
      this.GetListHistoryOrder();

      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      }
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

  formatDateVN(input) {
    return FormatDateVN(input);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
