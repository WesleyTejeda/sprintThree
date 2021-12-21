import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {

  constructor(private getService: GetService) { }

  ngOnInit(): void {
    
  }

}
