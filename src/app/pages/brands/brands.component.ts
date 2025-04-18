import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  ibrands:WritableSignal<Ibrands[]> = signal([])

  ngOnInit(): void {
    this.getBrandData();
  }

  getBrandData(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.ibrands.set (res.data);
      },
    });
  }


  showAlert(brand:Ibrands) {
    
    Swal.fire({
      html: `

        <div style="display: flex; align-items: center; gap: 20px; ">
        <div style="text-align: left;">
        <h3 class="text-4xl py-3 text-center border-b-2 text-green-600 font-light my-4 mt-6">${brand.name}</h3>
        <p > ${brand.slug}</p>
        </div>
        <img src="${brand.image}" alt="${brand.name}" style="width: 250px; height: auto; border-radius: 10px;" />
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'close',
      showCancelButton: false,
      customClass: {
        confirmButton: 'swal2-confirm-custom',
        popup: 'swal2-popup-custom',
      },
    });
  }
}
