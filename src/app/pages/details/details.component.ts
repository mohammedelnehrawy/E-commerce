import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProServiceService } from '../../core/services/products/pro-service.service';
import { Iproducts } from '../../shared/interfaces/IProducts';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject (ActivatedRoute)
  private readonly _ProServiceService = inject (ProServiceService)

detailsProduct:Iproducts | null = null;

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe(
    {
      next:(p)=> {
    let idProduct = p.get('id');
    this._ProServiceService.getSpecificProducts(idProduct).subscribe({
      next:(res)=> {
        this.detailsProduct = res.data;
      },
      error:()=>{

      }
    })
      },
    }
  )
}

}
