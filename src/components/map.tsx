import { MouseEventHandler, useEffect, useReducer, useRef } from 'react';
import { Map, MapMouseEvent, NavigationControl, StyleSpecification } from 'maplibre-gl';
import './map.css';


export default function MyMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<Map>()
    const myMapStyle: StyleSpecification = {
        "version": 8,
        "sources": {
            "osm": {
                "type": "raster",
                "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                "tileSize": 256,
                "attribution": "&copy; OpenStreetMap Contributors",
                "maxzoom": 19
            }
        },
        "layers": [
            {
                "id": "osm",
                "type": "raster",
                "source": "osm" // This must match the source key above
            }
        ]
    };

    useEffect(() => {


        const initialState = {
            lng: 0,
            lat: 48,
            zoom: 4,
        };


        mapRef.current = new Map({
            container: mapContainerRef.current as HTMLElement,
            style: myMapStyle,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });
        mapRef.current.addControl(new NavigationControl({}), 'top-right');
    }, []);

    const handleMapClick = (event: any) => {
        console.log(event)
        //const [longitude, latitude] = event.lngLat.toArray()
        //console.log(`handleMapClick ${longitude} ${latitude}`)
    }


    return (
        <div className='map-wrap'>
            <div
                className="map"
                ref={mapContainerRef}
                onClick={handleMapClick}
            ></div>
        </div>
    )

};

