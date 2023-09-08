import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from '../common/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  medicines: any;
  addToCartItems: any = [];
  searchForm!: FormGroup;
  cartItemsCount: number = 0;

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService,private router : Router) {
    this.cartItemsCount = this.addToCartItems.length; //5;
  }

 

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: new FormControl() // Initialize with an empty string
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe(() => this.onSearch())

    // let cart: any = localStorage.getItem('Cart');
    // if (cart) {
    //   cart = JSON.parse(cart);
  
    //   cart.push({medicine_id: 'dsjhfsdkjf', quantity: 10});
  
    //   localStorage.setItem('Cart', JSON.stringify(cart));

    // } else {
    //   localStorage.setItem('Cart', JSON.stringify([{medicine_id: 'dfsdfd', quantity: 2}]))
      
    // }
    // // this.medicines = this.getmedicines();
  }
  
  gotocart(){
    this.router.navigate(['/cart'])
  }

  onSearch() {
    const searchString = this.searchForm.controls["searchTerm"].value;

    if (searchString.length > 3) {
      this.apiservice.medcine(searchString).subscribe((data: any) => {
        if (data.status_code === '1' && data.data.result.length > 0) {
          console.log(data)
          this.medicines = data.data.result;
        } else {
          this.medicines = null;
        }
      })
    } else {
      this.medicines = null;
    }
  }


  addToCart(medicine: any) {
    if (!medicine.itemCount) {
      medicine.itemCount = 1;
      this.addToCartItems.push(medicine)
      this.cartItemsCount++;
       let cart: any = localStorage.getItem('Cart');
    if (cart) {
      cart = JSON.parse(cart);
  
      cart.push(medicine);
  
      localStorage.setItem('Cart', JSON.stringify(cart));

    } else {
      localStorage.setItem('Cart', JSON.stringify(this.addToCartItems))
      
    }
    }

  }

  incrementItem(medicine: any) {
    if (medicine.itemCount) {
      medicine.itemCount++;
      let cart: any = localStorage.getItem('Cart');
      if (cart) {
        cart = JSON.parse(cart);
    
        cart.find((a: any) => a.medicine_id === medicine.medicine_id).itemCount =  medicine.itemCount
    
        localStorage.setItem('Cart', JSON.stringify(cart));
  
      }
    }
  }

  decrementItem(medicine: any) {
    if (medicine.itemCount && medicine.itemCount > 0) {
      medicine.itemCount--;
      let cart: any = localStorage.getItem('Cart');
      if (cart) {
        cart = JSON.parse(cart);
        console.log(cart.find((a: any) => a.medicine_id === medicine.medicine_id))
        cart.find((a: any) => a.medicine_id === medicine.medicine_id).itemCount =  medicine.itemCount
    
        localStorage.setItem('Cart', JSON.stringify(cart));
  
      }
    }
    if((medicine.itemCount === 0) && (this.addToCartItems.findIndex((a: any) => a.medicine_id === medicine.medicine_id) > -1)){
      let cart: any = localStorage.getItem('Cart');
      if (cart) {
        cart = JSON.parse(cart);

        cart.splice(cart.findIndex((a: any) => a.medicine_id === medicine.medicine_id), 1);
    
        localStorage.setItem('Cart', JSON.stringify(cart));
  
      }
      this.addToCartItems.splice(this.addToCartItems.findIndex((a: any) => a.medicine_id === medicine.medicine_id), 1);
      this.cartItemsCount--;

      
    }
   
  }
}

