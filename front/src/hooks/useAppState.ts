import {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';

const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        setIsComeback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        console.log('App has come to the background!');
        setIsComeback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appStateVisible,
    isComeback,
  };
};

export default useAppState;
