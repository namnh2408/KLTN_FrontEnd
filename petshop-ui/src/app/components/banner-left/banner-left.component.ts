import { CategoryService } from './../../services/category.service';
import { Component,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-banner-left',
  templateUrl: './banner-left.component.html',
  styleUrls: ['./banner-left.component.scss']
})
export class BannerLeftComponent implements OnInit {

  public parentBreeds : any;
  public childBreeds : any;
  public suppliers : any;

  public breedAlls : any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryService : CategoryService) { 
    }

  ngOnInit(): void {
    this.getListSupplier();
    this.getListBreedAll();
  }

  ngAfterViewInit() : void {
    
  }

  

  getListBreedParent(){
      this.categoryService.getListBreedParent().subscribe((res : any) => {
        this.parentBreeds = res.content.breeds;
      })
  }

  getListBreedChild(id: any){
    this.categoryService.getListBreedChild(id).subscribe(( res : any) =>{
      this.childBreeds = res.content.breeds;
    })
  }

  getListSupplier(){
    this.categoryService.getListSupplierChild().subscribe((res: any) =>{
      this.suppliers = res.content.suppliers;
    })
  }

  getListBreedAll(){
    this.categoryService.getListBreedAll().subscribe((res:any)=>{
      this.breedAlls = res.content.breeds;
    })
  }

 /*  reloadRoute() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  } */
}
