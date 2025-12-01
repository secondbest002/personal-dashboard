export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
}

export interface PrayerData {
    timings: PrayerTimes;
    date: {
        readable: string;
        timestamp: string;
    };
    meta: {
        latitude: number;
        longitude: number;
        timezone: string;
        method: {
            name: string;
            params: {
                Fajr: number;
                Isha: number;
            };
        };
    };
}

export interface PrayerResponse {
    code: number;
    status: string;
    data: PrayerData;
}
