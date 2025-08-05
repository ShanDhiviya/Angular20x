import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private apiService = inject(ApiService);

  counter = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);
  apis = signal<any[]>([]);

  increment() {
    this.counter.update(count => count + 1);
  }

  decrement() {
    this.counter.update(count => count - 1);
  }

  async loadApis() {
    try {
      this.loading.set(true);
      this.error.set(null);
      const data = await this.apiService.getApis();
      this.apis.set(data.entries.slice(0, 5));
    } catch (err) {
      this.error.set('Failed to load APIs');
    } finally {
      this.loading.set(false);
    }
  }

  ngOnInit() {
    this.loadApis();
  }
}
