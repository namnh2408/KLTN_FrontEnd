import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEnumToList } from '../../../heplers/utils';
import { StatusNormal } from '../../../models/status';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  id: string;
  form: FormGroup;
  loading = false;
  submitted = false;
  firstload = false;

  orderItems: any;

  orderStatusText = StatusNormal;
  orderStatusOptions = []

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal) {
    this.buildSelection();
  }

  ngOnInit() {
    this.firstload = true;
    this.id = this.route.snapshot.params['id'];

    this.orderService.GetOrderDetail(this.id).subscribe((res: any) => {
      var orderDetail = res.content.OrderDetail;

      this.f.Id.setValue(this.id);
      this.f.CustomerName.setValue(orderDetail.CustomerName);
      this.f.CustomerPhone.setValue(orderDetail.CustomerPhone);
      this.f.CustomerEmail.setValue(orderDetail.CustomerEmail);
      this.f.CustomerAddress.setValue(orderDetail.CustomerAddress);
      this.f.TotalMoney.setValue(orderDetail.TotalMoney);
      this.f.Note.setValue(orderDetail.Note);
      this.orderItems = orderDetail.OrderItems;
    });

    this.form = this.formBuilder.group({
      Id: [0],
      CustomerName: ['', Validators.required],
      CustomerPhone: ['', Validators.required],
      CustomerEmail: ['', Validators.required],
      CustomerAddress: ['', Validators.required],
      TotalMoney: [0, Validators.required],
      Note: ['', Validators.required]
    });

    this.form.disable();
  }

  get f() { return this.form.controls; }

  ngAfterViewInit() {

  }

  buildSelection() {
    ChangeEnumToList(this.orderStatusText, this.orderStatusOptions);
  }

  tabchange: string[] = ['Thông tin đơn hàng','Các sản phẩm'];
  selectedwallet = this.tabchange[0];
}
