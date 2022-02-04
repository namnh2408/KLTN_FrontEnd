import { DatePipe } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEnumToList, FormBuilderConvertData } from '../../../heplers/utils';
import { AgeSelection, BreedSelection, ColorSelection, SexSelection, SizeSelection, StatusDetailSelection, SupplierSelection } from '../../../models/petdetail';
import { StatusNormal } from '../../../models/status';
import { PetDetailService } from '../../../services/petdetail.service';

@Component({
  selector: 'app-update-petdetail',
  templateUrl: './update-petdetail.component.html',
  styleUrls: ['./update-petdetail.component.scss']
})
export class UpdatePetdetailComponent implements OnInit {

  id: string;
  form: FormGroup;
  loading = false;
  submitted = false;
  firstload = false;

  urls: any;
  petimagedeletes: number[] = [];

  urlnews: string[] = [];
  FileData:string [] = [];

  breedSelection: BreedSelection[];
  supplierSelection: SupplierSelection[];
  ageSelection: AgeSelection[];
  colorSelection: ColorSelection[];
  sizeSelection: SizeSelection[];
  sexSelection: SexSelection[];
  statusDetailSelection: StatusDetailSelection[];

  petDetailStatusText = StatusNormal;
  petDetailStatusOptions = []

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private petDetailService: PetDetailService,
    private modalService: NgbModal,
    private datePipe: DatePipe) {
    this.buildSelection();
    this.getNormalAgeSelection();
    this.getNormalColorSelection();
    this.getNormalSizeSelection();
    this.getNormalSexSelection();
    this.getNormalStatusDetailSelection();
  }

  ngOnInit() {
    this.firstload = true;
    this.id = this.route.snapshot.params['id'];

    this.petDetailService.GetDetailPetDetail(this.id)
    .subscribe((x: any) => {
      var petDetail = x.content.ProductDetail;
      this.f.Id.setValue(this.id);
      this.f.BreedId.setValue(petDetail.BreedId);
      this.f.SupplierId.setValue(petDetail.SupplierId);
      this.f.AgeId.setValue(petDetail.AgeId);
      this.f.ColorId.setValue(petDetail.ColorId);
      this.f.SizeId.setValue(petDetail.SizeId);
      this.f.SexId.setValue(petDetail.SexId);
      this.f.StatusDetailId.setValue(petDetail.StatusDetailId);
      this.f.Status.setValue(petDetail.Status);
      this.f.Price.setValue(petDetail.Price);
      this.f.Discount.setValue(petDetail.Discount);
      this.f.Quantity.setValue(petDetail.Quantity);
      this.urls = petDetail.aProductProductImageForModels;
      this.firstload = false;

      this.getNormalBreedPetDetailSelection();
      this.getNormalSupplierPetDetailSelection();
    });

    this.form = this.formBuilder.group({
      Id: [0],
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

    for(var i = 0; i< this.petimagedeletes.length; i++){
      this.petDetailService.DeletePetDetailImage(this.petimagedeletes[i])
      .subscribe(() => {});
    }

    let formData = FormBuilderConvertData(this.form.value);
    for (var i = 0; i < this.FileData.length; i++) { 
      formData.append("FileData", this.FileData[i]);
    }

    this.petDetailService.UpdatePetDetail(formData)
    .subscribe(() => {
      this.router.navigate(["admin/list-petdetail"]);
    }, error => {
      this.loading = false;
    });
  }

  buildSelection() {
    ChangeEnumToList(this.petDetailStatusText, this.petDetailStatusOptions);
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
            this.urlnews.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }
    }    
  }

  deleteItemImageOld(petimageid){
    this.urls.forEach((value,index)=>{
      if(value.PetImageId == petimageid){
        this.urls.splice(index,1);
      }
    });

    this.petimagedeletes.push(petimageid);
  }

  deleteItemImageNew(index){
    this.urlnews.splice(index, 1);
    this.FileData.splice(index, 1);
  }
}
