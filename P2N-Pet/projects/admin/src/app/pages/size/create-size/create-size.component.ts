import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeEnumToList } from '../../../heplers/utils';
import { StatusNormal } from '../../../models/status';
import { SizeService } from '../../../services/size.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-create-size',
  templateUrl: './create-size.component.html',
  styleUrls: ['./create-size.component.scss']
})
export class CreateSizeComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  sizeStatusText = StatusNormal;
  sizeStatusOptions = [];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sizeService: SizeService,
    private toastService: ToastService,) {
    this.buildSelection();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Title: ['', Validators.required],
      OrderView: [1, Validators.required],
      Status: [10, Validators.required]
    });
  }

  get f() { return this.form.controls; }

  ngAfterViewInit() {

  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.sizeService.CreateSize({...this.form.value})
      .subscribe((response: any) => {
        
          this.router.navigate(["admin/list-size"]);
      }, error => {
        this.loading = false;
      });
  }

  buildSelection() {
    ChangeEnumToList(this.sizeStatusText, this.sizeStatusOptions);
  }

}
