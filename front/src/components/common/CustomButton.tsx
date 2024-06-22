import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  PressableProps,
  Dimensions,
  View,
} from 'react-native';
import {colors} from '@/constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'medium' | 'large';
  inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={(styles.filledText, styles[`${variant}Text`])}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  inValid: {
    opacity: 0.5,
  },

  filled: {backgroundColor: colors.PINK_700},

  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },

  filledPressed: {
    backgroundColor: colors.PINK_500,
  },

  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },

  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    fontWeight: '700',
  },

  filledText: {
    color: colors.WHITE,
  },

  outlinedText: {
    color: colors.PINK_700,
  },
});

export default CustomButton;
