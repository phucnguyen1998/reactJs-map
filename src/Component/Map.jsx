import queryString from 'query-string';
import React from 'react';
import { Circle, LayerGroup, LayersControl, MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import DisplayPosition from './DisplayPosition';
import LocationMarker from './LocationMarker';
import './style.css';

function Map(props) {
    let params = queryString.parse(props.location.search)
    const [map, setMap] = React.useState(null)
    // eslint-disable-next-line no-unused-vars
    const [position, setPosition] = React.useState([params.lat || 20.9567291, params.lng || 105.8446046])
    const [zoom, setZoom] = React.useState(params.zoom || 13)

    return (
        <>
            {map ? <DisplayPosition zoom={zoom} center={position} map={map} /> : null}
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={false}
                whenCreated={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="TOPO-OSM-WMS">
                        <WMSTileLayer
                            layers={'TOPO-OSM-WMS'}
                            url="http://ows.mundialis.de/services/service"
                            opacity={1}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OSM-Overlay-WMS">
                        <WMSTileLayer
                            layers={'OSM-Overlay-WMS'}
                            url="http://ows.mundialis.de/services/service"
                            opacity={1}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="TOPO-WMS">
                        <WMSTileLayer
                            layers={'TOPO-WMS'}
                            url="http://ows.mundialis.de/services/service"
                            opacity={1}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay name="Layer group with circles">
                        <LayerGroup>
                            <Circle
                                center={[20.9567291, 105.8446046]}
                                pathOptions={{ fillColor: 'blue' }}
                                radius={200}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                <LocationMarker
                    layers={['TOPO-OSM-WMS']}
                    options={{
                        "format": "image/png",
                        "transparent": "true",
                        "attribution": "<a href='https://ows.terrestris.de/'>terrestris</a>",
                        "info_format": "text/html"
                    }}
                    url="https://ows.terrestris.de/osm/service"
                    setZoom={setZoom}
                />
            </MapContainer>
        </>
    );
}

export default Map;
