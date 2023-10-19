import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[appOneDecimal]",
})
export class OneDecimalDirective {
    constructor(private el: ElementRef) {}

    @HostListener("input", ["$event"]) onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value;

        // Remove any extra periods
        const cleanedValue = inputValue.replace(/(\d*\.\d*).*\./, "$1");

        if (cleanedValue !== inputValue) {
            input.value = cleanedValue;
        }
    }
}
