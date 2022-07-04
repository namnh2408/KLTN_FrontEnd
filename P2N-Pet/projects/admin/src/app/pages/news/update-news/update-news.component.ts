import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configCKEditor } from 'projects/admin/src/environments/environment';
import { ChangeEnumToList, FormBuilderConvertData } from '../../../heplers/utils';
import { TypeNewsSelection } from '../../../models/news';
import { StatusNormal } from '../../../models/status';
import * as Editor from '../../../libs/ckeditor5/build/ckeditor';
import { NewsService } from '../../../services/news.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.scss']
})
export class UpdateNewsComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  image: any;

  newsStatusText = StatusNormal;
  newsStatusOptions = [];

  typeNewsSelection : TypeNewsSelection;

  MyEditor = Editor;
  configCKEditor = configCKEditor;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private toastService: ToastService) {
      this.buildSelection();
      this.getNormalTypeNewsSelection();
    }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      Title: ['', Validators.required],
      Content: ['', Validators.required],
      HtmlContent: '',
      NewsImage: null,
      TypeNewsId: 0,
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
    let formData = FormBuilderConvertData(this.form.value);
    formData.append('Image', this.image);
    this.newsService.CreateNews(formData)
      .subscribe((response: any) => {

          this.router.navigate(["admin/list-news"]);
      }, error => {
        this.loading = false;
      });
  }

  buildSelection() {
    ChangeEnumToList(this.newsStatusText, this.newsStatusOptions);
  }

  getNormalTypeNewsSelection(){
    this.loading = true;
    this.newsService.GetNormalTypeNewsSelection().subscribe( (res: any) =>{
      this.typeNewsSelection = res.content.Selection;
      this.loading = false;
    })
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      let thatForm = this.f;
      const [file] = event.target.files;

      var reader = new FileReader();
      reader.onload = function (e) {
        thatForm.NewsImage.setValue(e.target.result);
      }

      this.image = file;
      reader.readAsDataURL(file);
    }
  }
}