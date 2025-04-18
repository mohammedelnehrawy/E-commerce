import { Category } from './../../shared/interfaces/icart';
import { CategoriesService } from './../../core/services/Categories/categories.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

 private readonly CategoriesService = inject(CategoriesService);
  Category:WritableSignal<Category[]> = signal([])

  ngOnInit(): void {
    this.getCategData();
  }

  getCategData(): void {
    this.CategoriesService.getAllCateg().subscribe({
      next: (res) => {
        console.log(res.data);
        this.Category.set(res.data);
      },
    });
  }
}
