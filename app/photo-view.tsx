import Feather from '@expo/vector-icons/Feather';
import {
  Image,
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { SunsetColors, SunsetUtils } from '@/constants/sunset-colors';

type Props = {
  capturedImageUri: string | null;
  retakePhoto: () => void;
  saveImageToLibrary: () => void;
};
export function PhotoView(props: Props) {
  const {
    capturedImageUri, retakePhoto, saveImageToLibrary,
  } = props;

  if (!capturedImageUri) {
    return null;
  }

  return (
    <View style={styles.fullScreenImageContainer}>
      <Image source={{ uri: capturedImageUri }} style={styles.fullScreenImage} />
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={retakePhoto}>
          <Feather name="x" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={saveImageToLibrary}
        >
          <View style={styles.captureButtonInner}>
            <Feather name="check" size={40} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.placeholderButton}>
          <View style={{ width: 30, height: 30 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  fullScreenImageContainer: {
    flex: 1,
    backgroundColor: SunsetColors.background.dark,
  },
  button: {
    alignItems: 'center',
    backgroundColor: SunsetColors.interactive.button,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
    ...SunsetUtils.createShadow(SunsetColors.primary.sunset, 0.3),
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullScreenImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  captureButton: {
    alignItems: 'center',
    backgroundColor: SunsetColors.interactive.button,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: SunsetColors.interactive.button,
    ...SunsetUtils.createShadow(SunsetColors.interactive.button, 0.4),
    shadowRadius: 6,
    elevation: 8,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    backgroundColor: SunsetColors.interactive.button,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: SunsetColors.interactive.button,
    shadowColor: SunsetColors.interactive.button,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
