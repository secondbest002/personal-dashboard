"use client";

import { useState, useEffect } from "react";

interface Coordinates {
    lat: number;
    lon: number;
}

interface GeolocationState {
    coordinates: Coordinates | null;
    loading: boolean;
    error: string | null;
}

// Default to Jakarta if permission denied or error
const DEFAULT_COORDS = {
    lat: -6.2088,
    lon: 106.8456,
};

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        coordinates: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setState({
                coordinates: DEFAULT_COORDS,
                loading: false,
                error: "Geolocation is not supported by your browser",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    loading: false,
                    error: null,
                });
            },
            (error) => {
                console.warn("Geolocation permission denied or error:", error.message);
                setState({
                    coordinates: DEFAULT_COORDS,
                    loading: false,
                    error: error.message,
                });
            }
        );
    }, []);

    return state;
}
