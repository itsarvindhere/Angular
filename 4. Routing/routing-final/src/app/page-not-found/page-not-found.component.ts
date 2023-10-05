import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.route.snapshot.data.title)
  }

}
