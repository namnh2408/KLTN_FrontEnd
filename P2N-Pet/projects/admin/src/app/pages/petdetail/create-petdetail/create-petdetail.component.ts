import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeEnumToList, FormBuilderConvertData } from '../../../heplers/utils';
import { CategorySelection } from '../../../models/pet';
import { AgeSelection, BreedSelection, ColorSelection, SexSelection, SizeSelection, StatusDetailSelection, SupplierSelection } from '../../../models/petdetail';
import { StatusNormal } from '../../../models/status';
import { PetDetailService } from '../../../services/petdetail.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-create-petdetail',
  templateUrl: './create-petdetail.component.html',
  styleUrls: ['./create-petdetail.component.scss']
})
export class CreatePetdetailComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  FileData:string [] = [];
  urls: string[] = [];

  breedSelection: BreedSelection[];
  supplierSelection: SupplierSelection[];
  ageSelection: AgeSelection[];
  colorSelection: ColorSelection[];
  sizeSelection: SizeSelection[];
  sexSelection: SexSelection[];
  statusDetailSelection: StatusDetailSelection[];

  petDetailStatusText = StatusNormal;
  petDetailStatusOptions = [];
  categorySelection : CategorySelection[];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private petDetailService: PetDetailService,
    private toastService: ToastService,) {
    this.buildSelection();
    this.getNormalAgeSelection();
    this.getNormalColorSelection();
    this.getNormalSizeSelection();
    this.getNormalSexSelection();
    this.getNormalStatusDetailSelection();
    this.getCategoryNormalSelection();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      BreedId: 0,
      SupplierId: 0,
      AgeId: null,
      ColorId: null,
      SizeId: null,
      SexId:null,
      StatusDetailId: [1, Validators.required],
      Status: [10, Validators.required],
      Price: null,
      Discount: null,
      Quantity: [1, Validators.required],
    });

    this.getNormalBreedPetDetailSelection();
    this.getNormalSupplierPetDetailSelection();
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
    
    let formData = FormBuilderConvertData(this.form.value);
    for (var i = 0; i < this.FileData.length; i++) { 
      formData.append("FileData", this.FileData[i]);
    }

    this.petDetailService.CreatePetDetail(formData)
      .subscribe((response: any) => {
        
          this.router.navigate(["admin/list-petdetail"]);
      }, error => {
        this.loading = false;
      });
  }

  buildSelection() {
    ChangeEnumToList(this.petDetailStatusText, this.petDetailStatusOptions);
  }

  getCategoryNormalSelection(){
    this.loading = true;

    this.petDetailService.GetNormalCategory().subscribe( (res: any) => {
      this.categorySelection = res.content.Selection;

      this.loading = false;
    })
  }

  getNormalAgeSelection() {
    this.loading = true;
    this.petDetailService.GetNormalAgeSelection().subscribe((res: any) => {
      this.ageSelection = res.content.AgeSelection;
      this.loading = false;
    });
  }

  getNormalColorSelection(){
    this.loading = true;
    this.petDetailService.GetNormalColorSelection().subscribe((res: any) => {
      this.colorSelection = res.content.ColorSelection;
      this.loading = false;
    });
  }

  getNormalSizeSelection(){
    this.loading = true;
    this.petDetailService.GetNormalSizeSelection().subscribe((res: any) => {
      this.sizeSelection = res.content.SizeSelection;
      this.loading = false;
    });
  }

  getNormalSexSelection(){
    this.loading = true;
    this.petDetailService.GetNormalSexSelection().subscribe((res: any) => {
      this.sexSelection = res.content.SexSelection;
      this.loading = false;
    });
  }

  getNormalBreedPetDetailSelection(){
    this.loading = true;
    this.petDetailService.GetNormalBreedPetDetailSelection(this.form.controls['SupplierId'].value).subscribe((res: any) => {
      this.breedSelection = res.content.BreedSelection;
      this.loading = false;
    });
  }

  getNormalSupplierPetDetailSelection(){
    this.loading = true;
    this.petDetailService.GetNormalSupplierPetDetailSelection(this.form.controls['BreedId'].value).subscribe((res: any) => {
      this.supplierSelection = res.content.SupplierSelection;
      this.loading = false;
    });
  }

  getNormalStatusDetailSelection(){
    this.loading = true;
    this.petDetailService.GetNormalStatusDetailSelection().subscribe((res: any) => {
      this.statusDetailSelection = res.content.StatusDetailSelection;
      this.loading = false;
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {

      for (var i = 0; i < event.target.files.length; i++) { 
        this.FileData.push(event.target.files[i]);
      }

      let files = event.target.files;
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }
    }
    
  }

  deleteItemImage(index){
    this.urls.splice(index, 1);
    this.FileData.splice(index, 1);
  }
}
