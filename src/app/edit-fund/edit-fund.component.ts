import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fund } from '../funds/funds.model';
import { DeleteService } from '../services/delete.service';
import { GetService } from '../services/get.service';
import { PatchService } from '../services/patch.service';

@Component({
  selector: 'app-edit-fund',
  templateUrl: './edit-fund.component.html',
  styleUrls: ['./edit-fund.component.css']
})
export class EditFundComponent implements OnInit {
  error:boolean = false;
  id:number = 0;
  shouldDelete:boolean = false;
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

  constructor(private router: Router,
    private route: ActivatedRoute,
    private getService: GetService,
    private patchService: PatchService,
    private deleteService: DeleteService) { }

  ngOnInit(): void {
    this.route.params.subscribe( ({ id }) => {
      this.id = id;
      this.getService.getSingleFund(id).subscribe(fund => {
        this.fund = fund;
        this.yearlyRangeFirst = fund.yearlyRange.split(" - ")[0];
        this.yearlyRangeLast = fund.yearlyRange.split(" - ")[1];
        this.todaysRangeFirst = fund.todaysRange.split(" - ")[0];
        this.todaysRangeLast = fund.todaysRange.split(" - ")[1];
        console.log(this.fund);
      })
    })
  }

  patchFund(){
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
    let fundCopy:any = this.fund;
    delete fundCopy.yearlyRange;
    delete fundCopy.todaysRange;
    for (let key in fundCopy){
      if( fundCopy[key].length == 0){
        this.error = true;
        return
      }
    }
    //Correct formatting for ranges and trim white space before patching
    this.fund.company = this.fund.company.trim();
    this.fund.open = this.fund.open.trim();
    this.fund.martketCap = this.fund.martketCap.trim();
    this.fund.sector = this.fund.sector.trim();
    this.fund.industry = this.fund.industry.trim();
    this.fund.headquarters = this.fund.headquarters.trim();
    this.patchService.patchFund(this.fund, this.id).subscribe(res => {
      this.router.navigateByUrl("/funds/"+this.id);
    })
  }

  toggleDelete(){
    this.shouldDelete = true;
  }

  deleteFund(){
    if(!this.shouldDelete){
      return
    }
    this.deleteService.deleteFund(this.id).subscribe(res => {
      this.router.navigateByUrl("/funds")
    })
  }
}
