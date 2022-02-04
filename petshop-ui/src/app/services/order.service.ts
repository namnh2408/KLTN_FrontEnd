import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  CreateOrder(condition: any){
    return this.http.post(`${environment.apiUrl}Order/CreateOrder`, condition);
  }

  GetListHistoryOrder(){
    return this.http.get(`${environment.apiUrl}Order/GetListHistoryOrder`);
  }

  GetOrderDetail(OrderId: any){
    return this.http.get(`${environment.apiUrl}Order/GetOrderDetail?orderId=${OrderId}`);
  }

  CancelOrder(OrderId: any){
    return this.http.post(`${environment.apiUrl}Order/CancelOrder?orderId=${OrderId}`, null);
  }
}
