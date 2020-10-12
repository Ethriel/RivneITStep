import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-id-test',
  templateUrl: './id-test.component.html',
  styleUrls: ['./id-test.component.css']
})
export class IdTestComponent implements OnInit {

  id: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

}
