import { Component, OnInit } from '@angular/core';
import { Fund } from '../funds/funds.model';
import { CreateService } from '../services/create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-fund',
  templateUrl: './create-fund.component.html',
  styleUrls: ['./create-fund.component.css']
})
export class CreateFundComponent implements OnInit {
  error:Boolean = false;
  todaysRangeFirst:string = "";
  todaysRangeLast: string = "";
  yearlyRangeFirst:string = "";
  yearlyRangeLast: string = "";
  fund:Fund = {
    company: "",
    open: "",
    volume: "",
    todaysRange: "",
    yearlyRange: "",
    martketCap: "",
    sector: "",
    industry: "",
    headquarters: "",
  };
  constructor(private createService: CreateService, private router: Router) { }

  ngOnInit(): void {
  }

  createFund(): void {
    this.error = false;
    this.fund.yearlyRange = `${this.yearlyRangeFirst} - ${this.yearlyRangeLast}`;
    this.fund.todaysRange = `${this.todaysRangeFirst} - ${this.todaysRangeLast}`;
    this.createService.createFund(this.fund).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("/funds");
    })
  }
}
