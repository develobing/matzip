import {storageKeys} from '@/constants';
import useLegendStore from '@/store/useLegendStore';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {useEffect} from 'react';

function useLegendStorage() {
  const {isVisible, setIsVisible} = useLegendStore();

  const set = async (isVisible: boolean) => {
    await setEncryptStorage(storageKeys.SHOW_LEGEND, isVisible);
    setIsVisible(isVisible);
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getEncryptStorage(storageKeys.SHOW_LEGEND)) ?? false;
      setIsVisible(storedData);
    })();
  }, []);

  return {isVisible, set};
}

export default useLegendStorage;
