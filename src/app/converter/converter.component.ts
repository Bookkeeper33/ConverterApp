import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { CurrencyService } from "../currency.service";
import { CurrencyRates } from "./currency_rates.interface";

@Component({
    selector: "app-converter",
    templateUrl: "./converter.component.html",
    styleUrls: ["./converter.component.css"],
})
export class ConverterComponent implements OnInit, OnDestroy {
    currencies = ["USD", "EUR", "UAH"];
    baseAmount: number = 0;
    targetAmount: number = 0;
    currencySubscription!: Subscription;
    private currencyRates: CurrencyRates = {
        USD: {
            UAH: 0,
            EUR: 0,
        },
        EUR: {
            UAH: 0,
            USD: 0,
        },
        UAH: {
            USD: 0,
            EUR: 0,
        },
    };

    constructor(private currencyService: CurrencyService) {}

    ngOnInit(): void {
        this.populateCurrencyRates();
    }

    onChangeAmount(
        source: string,
        baseCurrency: string,
        targetCurrency: string
    ) {
        if (source === "baseAmount" && this.baseAmount) {
            this.targetAmount = this.calculateConvertedAmount(
                parseFloat(this.baseAmount.toString()),
                this.currencyRates[baseCurrency][targetCurrency],
                4
            );
        }

        if (source === "targetAmount" && this.targetAmount) {
            this.baseAmount = this.calculateConvertedAmount(
                parseFloat(this.targetAmount.toString()),
                1 / this.currencyRates[baseCurrency][targetCurrency],
                4
            );
        }

        if (baseCurrency === targetCurrency) {
            this.targetAmount = this.baseAmount;
        }

        this.isInputEmpty();
    }

    calculateConvertedAmount(
        amount: number,
        rate: number,
        maxDecimalPlaces: number
    ): number {
        const roundedAmount = parseFloat(amount.toFixed(maxDecimalPlaces));
        return roundedAmount * rate;
    }

    ngOnDestroy(): void {
        this.currencySubscription.unsubscribe();
    }

    private isInputEmpty() {
        if (!this.baseAmount || !this.targetAmount) {
            this.baseAmount = 0;
            this.targetAmount = 0;
        }
    }

    private populateCurrencyRates() {
        this.currencies.forEach((base) => {
            this.currencies.forEach((target) => {
                if (base !== target) {
                    this.currencySubscription = this.currencyService
                        .getRates(base, target)
                        .subscribe((rate) => {
                            this.currencyRates[base][target] = rate;
                        });
                }
            });
        });
    }
}
