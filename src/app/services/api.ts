import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ApiResponse {
  count: number;
  entries: Array<{
    API: string;
    Description: string;
    Category: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.publicapis.org/entries';

  async getApis(): Promise<ApiResponse> {
    return firstValueFrom(
      this.http.get<ApiResponse>(this.apiUrl)
    );
  }
}
