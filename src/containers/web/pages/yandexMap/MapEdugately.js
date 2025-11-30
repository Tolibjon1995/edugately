import React from 'react'
import {
    Map,
    Placemark,
    YMaps,
    GeolocationControl,
    SearchControl,
    RouteButton,
    ZoomControl,
    TypeSelector,
    TrafficControl
} from 'react-yandex-maps'
import '../../../../style/css/mapEdu.css'
const MapEdugately = () => {
    return (

        <YMaps>
            <div className='mapsedu'>
                <Map
                    defaultState={{
                        center: [41.315789, 69.241131],
                        zoom: 18,

                    }}
                    width={'100%'}
                    height={'400px'}
                >
                    <Placemark geometry={[41.315789, 69.241131]} />
                    <GeolocationControl options={{ float: 'right' }} />
                    <SearchControl options={{ float: 'right' }} />
                    <RouteButton options={{ float: 'right' }} />
                    <ZoomControl options={{ float: 'right' }} />
                    <TypeSelector options={{ float: 'right' }} />
                    <TrafficControl options={{ float: 'right' }} />
                </Map>
            </div>
        </YMaps>

    )
}

export default MapEdugately