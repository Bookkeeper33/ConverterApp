import { Component, OnInit } from "@angular/core";
import { CurrencyService } from "../currency.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
    usdRate$!: Observable<number>;
    eurRate$!: Observable<number>;

    constructor(private currencyService: CurrencyService) {}

    ngOnInit(): void {
        this.usdRate$ = this.currencyService.getRates("USD");
        this.eurRate$ = this.currencyService.getRates("EUR");
    }
}
