import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { Fund } from './funds.model';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  funds:Fund[] = [];

  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.getData().subscribe((res:Fund[]) => {
      this.funds = res;
      console.log(this.funds);

    })
  }

}
