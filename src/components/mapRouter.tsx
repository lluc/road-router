import { useState } from 'react';
import Map, { MapLayerMouseEvent, Marker, MarkerDragEvent, NavigationControl, useMap, Layer, MapProvider } from 'react-map-gl';
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import ProcessingRoutingControl from './processRoutingControl'

export default function MapRouter() {

    interface MarkerType {
        longitude: number
        latitude: number
        status: string
    }

    const [markers, setMarkers] = useState<MarkerType[]>([])
    const [markerStatus, setMarkerStatus] = useState<string>("")

    const handleMapClick = (event: MapLayerMouseEvent) => {
        event.preventDefault();
        const [longitude, latitude] = event.lngLat.toArray()


        if (markerStatus === "done") {
            return;
        }

        let newMarkerStatus = ""
        switch (markerStatus) {
            case "":
                newMarkerStatus = "start"
                break;
            case "start":
                newMarkerStatus = "finish";
                break;
            case "finish":
                newMarkerStatus = "done";
                break;
        }

        if (newMarkerStatus != "done") {
            setMarkers((prevMarkers) => [...prevMarkers, { longitude, latitude, status: newMarkerStatus }])
        }
        setMarkerStatus(newMarkerStatus);

    }

    const handleMarkerStyle = () => {
        switch (markerStatus) {
            case "start":
                return {
                    color: "green",
                    width: 10,
                    height: 10
                };
            case "finish":
                return {
                    color: "red",
                    width: 10,
                    height: 10
                };
            default:
                return {};
        }
    }

    return (
        <>
            <MapProvider>
                <Map
                    id='mapRouting'
                    mapLib={maplibregl}
                    style={{ width: "100vw", height: "100vh" }}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                    onClick={handleMapClick}
                    initialViewState={{
                        longitude: 1.0,
                        latitude: 47.8,
                        zoom: 12
                    }}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            color={handleMarkerStyle().color}
                            draggable={true}
                            onDragEnd={(e: MarkerDragEvent) => { console.log(e) }}
                        >
                        </Marker>
                    ))}
                    <Layer
                        id="route-layer"
                        type="line"
                        source="geojson"
                        paint={{ "line-width": 2 }} />
                    <NavigationControl />
                </Map>
                <ProcessingRoutingControl {...markers} />
            </MapProvider>
        </>
    )
}