import { City } from "./city";

export interface Weather {
    localObservationDateTime: Date;
    epochTime: number;
    weatherText: string;
    hasPrecipitation: boolean
    precipitationType: string;
    isDayTime: boolean;
    temperature: Temperature;
    link: string;
    city:City;
}

export interface Temperature {
    metric: Metric;
    imperial: Imperial;
}

export interface Metric {
    value: string;
    unit: string;
}

export interface Imperial {
    value: string;
    unit: string;
}