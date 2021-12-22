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
  // editType: string = this.router.url.split("/")[this.router.url.split("/").length - 1];
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
    id: 0
  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private getService: GetService,
    private patchService: PatchService,
    private deleteService: DeleteService) { }

  ngOnInit(): void {
    this.route.params.subscribe( ({ id }) => {
      // console.log(this.router.url.split("/")[this.router.url.split("/").length - 1])
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
    this.fund.yearlyRange = `${this.yearlyRangeFirst} - ${this.yearlyRangeLast}`;
    this.fund.todaysRange = `${this.todaysRangeFirst} - ${this.todaysRangeLast}`;
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
