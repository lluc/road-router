import { memo, useState } from 'react';
import { FetchRouteData } from '../services/fetchRouteData';
import './processRoutingControl.css'
import { useMap } from 'react-map-gl';

interface MarkerType {
    longitude: number
    latitude: number
    status: string
}


function ProcessingRoutingControl(props: MarkerType[]) {

    const [distance, setDistance] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [geometry, setGeometry] = useState<string>("")

    const { mapRouting } = useMap()

    return (
        <div className="control-panel">
            <h3>Calcul d'itinéraire</h3>
            <button
                onClick={() => {
                    console.log({ mapRouting })
                    console.log('Calculer')
                    console.log(props)
                    const args = {
                        lng_start: props[0].longitude,
                        lat_start: props[0].latitude,
                        lng_finish: props[1].longitude,
                        lat_finish: props[1].latitude
                    };
                    FetchRouteData({ ...args })
                        .then((res) => {
                            const { distance, duration, geometry } = res.routes[0]
                            setDistance(distance)
                            setDuration(duration)
                            setGeometry(geometry)
                        })
                    mapRouting?.fitBounds([
                        [props[0].longitude, props[0].latitude],
                        [props[1].longitude, props[1].latitude]
                    ])
                }}
            >Calculer
            </button>
            <div className='display-distance'>{(distance / 1000).toFixed(1)} km</div>
            <div className='display-duration'>{(duration / 60).toFixed(2)} min</div>


        </div>
    );
}

export default memo(ProcessingRoutingControl);
