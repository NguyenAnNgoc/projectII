import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public keySearch: any;
  public maxResult = 15;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(keySearch: any) {
    this.keySearch = keySearch;
    this.router.navigateByUrl('/youtube/search/' + keySearch);
  }

  homeClick() {
    this.router.navigateByUrl('/');
  }
}
