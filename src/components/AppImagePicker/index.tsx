import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {Portal} from 'react-native-portalize';
type Props = {
  openImagePicker: boolean;
  setOpenImagePicker: (openImagePicker: boolean) => void;
  onLaunchCamera: () => void;
  onLibrary: () => void;
};
const AppImagePicker = ({
  openImagePicker,
  setOpenImagePicker,
  onLaunchCamera,
  onLibrary,
}: Props) => {
  if (openImagePicker)
    return (
      <Portal>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
            paddingBottom: 10,
          }}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpenImagePicker(false)}
          />
          <Animated.View
            style={styles.container}
            entering={SlideInDown}
            exiting={SlideOutDown}>
            <Pressable style={styles.button} onPress={onLaunchCamera}>
              <Text style={styles.buttonText}>Chụp ảnh</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onLibrary}>
              <Text style={styles.buttonText}>Lấy ảnh từ thư viện</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setOpenImagePicker(false)}>
              <Text style={styles.buttonText}>Hủy</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Portal>
    );
};

export default AppImagePicker;
const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
});