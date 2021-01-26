import React, { useState } from 'react';
import { Marker, useMapEvents } from "react-leaflet";
// import * as WMS from "leaflet.wms";
// import { useMap } from "react-leaflet";

function LocationMarker(props) {
    const { setZoom } = props
    const [markers, setMarkers] = useState([]);
    // const { url, options, layers } = props;
    // const map = useMap()

    // // Add WMS source/layers
    // const source = WMS.source(
    //     url,
    //     options
    // );

    // for (let name of layers) {
    //     source.getLayer(name).addTo(map)
    // }

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
        },
    });

    useMapEvents({
        click(e) {
            const newMarker = e.latlng
            setMarkers([...markers, newMarker]);
        }
    })

    return (
        <>
            {markers.map((maker, index) => {
                return (
                    <Marker
                        key={index}
                        position={maker}
                    >
                    </Marker>
                )
            }
            )}
        </>
    )
}

export default LocationMarker;