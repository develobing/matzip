import {colors, feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ImageUri, ThemeMode} from '@/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {Image, Platform} from 'react-native';
import {ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  showOption?: boolean;
  zoomEnable?: boolean;
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
}

const PreviewImageList = ({
  imageUris,
  showOption = false,
  zoomEnable = false,
  onDelete,
  onChangeOrder,
}: PreviewImageListProps) => {
  const {theme} = useThemeStore();
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const styles = styling(theme);

  const handlePressImage = (index: number) => {
    if (zoomEnable) {
      navigation.navigate(feedNavigations.IMAGE_ZOOM, {index});
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => (
          <Pressable
            key={index}
            style={styles.imagePressable}
            onPress={() => handlePressImage(index)}>
            <Image
              source={{
                uri: `${
                  Platform.OS === 'android'
                    ? 'http://10.0.2.2:3030'
                    : 'http://localhost:3030'
                }/${uri}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />

            {showOption && (
              <>
                <Pressable
                  style={[styles.imageButton, styles.deleteButton]}
                  onPress={() => onDelete?.(uri)}>
                  <Ionicons
                    name="close"
                    size={20}
                    color={colors[theme].WHITE}
                  />
                </Pressable>

                {index > 0 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveLeft]}
                    onPress={() => onChangeOrder?.(index, index - 1)}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={20}
                      color={colors[theme].WHITE}
                    />
                  </Pressable>
                )}

                {index < imageUris.length - 1 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveRight]}
                    onPress={() => onChangeOrder?.(index, index + 1)}>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={20}
                      color={colors[theme].WHITE}
                    />
                  </Pressable>
                )}
              </>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    imagesViewer: {flexDirection: 'row', gap: 10, flexWrap: 'wrap'},
    container: {
      flexDirection: 'row',
      gap: 15,
    },
    imagePressable: {
      width: 70,
      height: 70,
    },
    image: {width: '100%', height: '100%'},
    imageButton: {
      position: 'absolute',
      backgroundColor: colors[theme].BLACK,
      zIndex: 1,
    },
    deleteButton: {
      top: 0,
      right: 0,
    },
    moveLeft: {
      bottom: 0,
      left: 0,
    },
    moveRight: {
      bottom: 0,
      right: 0,
    },
  });

export default PreviewImageList;
