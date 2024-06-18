import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&language=ko&key=${Config.GOOGLE_MAPS_API_KEY}`,
        );

        const result = data.results?.[0];
        const address = result
          ? result.formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        console.log('useGetAddress() - error', error);
        setResult(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export default useGetAddress;
