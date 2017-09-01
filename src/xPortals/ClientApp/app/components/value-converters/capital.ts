export class CapitalValueConverter {
    toView(value: string): string {
        return value && value.charAt(0).toUpperCase() + value.slice(1);
    }

    fromView(value: string) {

    }
}

