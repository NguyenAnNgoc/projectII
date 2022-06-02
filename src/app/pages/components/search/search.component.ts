import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() keySearch: any;
  public maxResult = 15;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    if(this.keySearch){     
    this.router.navigateByUrl('/youtube/search/' + this.keySearch);}
  }

  homeClick() {
    this.router.navigateByUrl('/');
  }
}
