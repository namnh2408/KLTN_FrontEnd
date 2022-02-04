import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  parentBreeds: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.getListBreedParent();
  }

  getListBreedParent(){
    this.categoryService.getListBreedParent().subscribe((res : any) => {
      this.parentBreeds = res.content.breeds;
    });
  }

}
