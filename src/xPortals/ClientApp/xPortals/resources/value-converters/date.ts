import * as moment from 'moment';

export class DateValueConverter {
    toView(value: string, format: string = 'M/D/YYYY'): string {
        return moment(value).format(format);
    }
}