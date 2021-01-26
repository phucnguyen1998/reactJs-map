/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function DisplayPosition(props) {
    const { zoom, map } = props;
    const [position, setPosition] = useState(map.getCenter())
    let history = useHistory();

    // const onClick = useCallback(() => {
    //     map.setView(center, 13) //(position,zoom)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [map])

    React.useEffect(() => {
        history.push(`/map?lat=${position.lat.toFixed(4)}&lng=${position.lng.toFixed(4)}&zoom=${zoom}`)
    }, [position, zoom])

    const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove])

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}, zoom:{zoom}
            {/* <button onClick={onClick}>reset</button> */}
        </p>
    )
}

export default React.memo(DisplayPosition);