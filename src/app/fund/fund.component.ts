import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { ActivatedRoute } from '@angular/router';
import { Fund } from '../funds/funds.model';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  fund: Fund = {
    company: "",
    open: "",
    volume: "",
    todaysRange: "",
    yearlyRange: "",
    martketCap: "",
    sector: "",
    industry: "",
    headquarters: "",
    id: 0
  };
  id: string = "";

  constructor(private route: ActivatedRoute, private getService: GetService) { }

  ngOnInit(): void {
    this.route.params.subscribe( ({ id }) => {
      this.id = id;
      this.getService.getSingleFund(id).subscribe(data => {
        this.fund = data;
      })
    })
  }
}
