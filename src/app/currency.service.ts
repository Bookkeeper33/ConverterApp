import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: "root",
})
export class CurrencyService {
    private KEY = environment.key;
    private apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    getRates(currency: string, toCurrency?: string): Observable<number> {
        return this.fetchCurrencyData(currency, toCurrency);
    }

    private fetchCurrencyData(
        baseCurrency: string,
        targetCurrency = "UAH"
    ): Observable<number> {
        const apiUrl = `${this.apiUrl}${this.KEY}/pair/${baseCurrency}/${targetCurrency}`;
        return this.http
            .get(apiUrl)
            .pipe(map((data: any) => data.conversion_rate));
    }
}
