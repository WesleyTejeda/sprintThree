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
    //Correct range format
    this.fund.yearlyRange = `${this.yearlyRangeFirst.trim()} - ${this.yearlyRangeLast.trim()}`;
    this.fund.todaysRange = `${this.todaysRangeFirst.trim()} - ${this.todaysRangeLast.trim()}`;
    //Validates empty ranges, shows error
    if( this.fund.yearlyRange.length <= 3 || this.fund.yearlyRange.length <= 3){
      this.error = true;
      return
    }
    //Validates empty entry fields, shows error if empty
    let fundCopy:any = {
      company: this.fund.company,
      open: this.fund.open,
      volume: this.fund.volume,
      martketCap: this.fund.martketCap,
      sector: this.fund.sector,
      industry: this.fund.industry,
      headquarters: this.fund.headquarters
    }
    for (let key in fundCopy){
      console.log(fundCopy[key].length)
      if( fundCopy[key].length == 0){
        this.error = true;
        return
      }
    }
    
    //Send fund with white space trim
    this.fund.company = this.fund.company.trim();
    this.fund.open = this.fund.open.trim();
    this.fund.martketCap = this.fund.martketCap.trim();
    this.fund.sector = this.fund.sector.trim();
    this.fund.industry = this.fund.industry.trim();
    this.fund.headquarters = this.fund.headquarters.trim();
    this.createService.createFund(this.fund).subscribe(res => {
      this.router.navigateByUrl("/funds");
    })
  }
}
