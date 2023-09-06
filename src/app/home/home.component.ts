import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../common/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  medicines: any;

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService) {
   
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''] // Initialize with an empty string
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe(() => this.onSearch())

    // this.medicines = this.getmedicines();
  }

  onSearch() {
   this.apiservice.medcine({ apikey: 'dwkoortGX8DVYzLP559sGJeWty4wX0de', searchstring: this.searchForm.value.searchTerm  }).subscribe((data: any) => {
    if (data.status_code === '1' && data.data.result.length > 0) {
      console.log(data)
      this.medicines = data.data.result;
    }
   })
  console.log("Hello");
    
  }
}
