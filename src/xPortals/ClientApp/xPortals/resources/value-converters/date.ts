import * as moment from 'moment';

export class DateValueConverter {
    toView(value: string): string {
        return moment(value).format('M/D/YYYY');
    }
}