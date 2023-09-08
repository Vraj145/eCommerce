import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  title = "Cart"
  addToCartItems: any = [];

  medicine: any;

  constructor(private router: Router){ }
  
  ngOnInit(): void {

    let cart = localStorage.getItem('Cart');
    if(cart){
      this.medicine = JSON.parse(cart)
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
    if((medicine.itemCount === 0) && (this.medicine.findIndex((a: any) => a.medicine_id === medicine.medicine_id) > -1)){
      let cart: any = localStorage.getItem('Cart');
      if (cart) {
        cart = JSON.parse(cart);

        cart.splice(cart.findIndex((a: any) => a.medicine_id === medicine.medicine_id), 1);
    
        localStorage.setItem('Cart', JSON.stringify(cart));
  
      }
      this.medicine.splice(this.medicine.findIndex((a: any) => a.medicine_id === medicine.medicine_id), 1)

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
  addpatient(){
    this.router.navigate(['/patient']);
  }

}
