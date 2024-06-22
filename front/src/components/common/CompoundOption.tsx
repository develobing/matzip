import {colors} from '@/constants';
import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface OptionContextValue {
  onClickOutside?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  animateType?: ModalProps['animationType'];
  hideOption: () => void;
}

function OptionMain({
  children,
  isVisible,
  animateType = 'slide',
  hideOption,
  ...props
}: OptionMainProps) {
  const onClickOutside = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animateType}
      onRequestClose={hideOption}
      {...props}>
      <OptionContext.Provider value={{onClickOutside}}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

function Background({children}: PropsWithChildren) {
  const optionContext = useContext(OptionContext);

  return (
    <SafeAreaView
      style={styles.optionBackground}
      onTouchEnd={optionContext?.onClickOutside}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
}

function Button({children, isDanger, ...props}: ButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      {...props}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.border} />;
}

export const CompoundOption = Object.assign(OptionMain, {
  Container,
  Background,
  Title,
  Button,
  Divider,
});

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0 / 0.5)',
    justifyContent: 'flex-end',
  },

  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },

  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },

  optionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },

  optionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },

  dangerText: {
    color: colors.RED_500,
  },

  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },

  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },

  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});
