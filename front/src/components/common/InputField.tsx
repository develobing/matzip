import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '@/constants';
import {mergeRefs} from '@/utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {disabled, touched, error, icon = null, ...props}: InputFieldProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
            props.multiline && styles.multiline,
          ]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}

            <TextInput
              ref={ref ? mergeRefs(ref, innerRef) : innerRef}
              editable={!disabled}
              placeholderTextColor={colors.GRAY_500}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              style={[styles.input, disabled && styles.disabled]}
              {...props}
            />
          </View>

          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },

  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  multiline: {
    paddingBottom: deviceHeight > 700 ? 45 : 30,
  },

  input: {
    fontSize: deviceHeight > 700 ? 20 : 15,
    color: colors.BLACK,
    padding: 0,
  },

  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },

  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },

  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
});

export default InputField;
