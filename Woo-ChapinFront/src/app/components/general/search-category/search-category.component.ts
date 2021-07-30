import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {
  public id;
  constructor(private route: ActivatedRoute) { 
    this.id = route.snapshot.params.id;
    console.log(this.id);
  }

  ngOnInit(): void {
  }

}
