import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { SunsetColors, SunsetUtils } from '@/constants/sunset-colors';
import { PhotoView } from './photo-view';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    requestMediaLibraryPermission();
  }, [requestMediaLibraryPermission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Chúng tôi cần quyền truy cập camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Cho phép Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCapturedImageUri(photo.uri);
        }
      } catch {
        Alert.alert('Lỗi', 'Không thể chụp ảnh');
      }
    }
  };

  const saveImageToLibrary = async () => {
    if (capturedImageUri && mediaLibraryPermission?.granted) {
      try {
        await MediaLibrary.saveToLibraryAsync(capturedImageUri);
        Alert.alert('Thành công', 'Ảnh đã được lưu vào thư viện');
        setCapturedImageUri(null);
      } catch {
        Alert.alert('Lỗi', 'Không thể lưu ảnh vào thư viện');
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImageUri(null);
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        if (isRecording) {
          cameraRef.current.stopRecording();
          setIsRecording(false);
        } else {
          setIsRecording(true);
          const video = await cameraRef.current.recordAsync();
          if (video && mediaLibraryPermission?.granted) {
            await MediaLibrary.saveToLibraryAsync(video.uri);
            Alert.alert('Thành công', 'Video đã được lưu vào thư viện');
          }
        }
      } catch {
        setIsRecording(false);
        Alert.alert('Lỗi', 'Không thể quay video');
      }
    }
  };

  const pickFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        Alert.alert('Đã chọn', 'Bạn đã chọn ảnh/video từ thư viện');
      }
    } catch {
      Alert.alert('Lỗi', 'Không thể chọn từ thư viện');
    }
  };

  return (
    <View style={styles.container}>
      {capturedImageUri ? (
        <PhotoView
          capturedImageUri={capturedImageUri}
          retakePhoto={retakePhoto}
          saveImageToLibrary={saveImageToLibrary}
        />
      ) : (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        >
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <FontAwesome6 name="arrows-rotate" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickFromLibrary}>
              <MaterialIcons name="my-library-add" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, isRecording && styles.recordingButton]}
              onPress={recordVideo}
            >
              {isRecording ? <Feather name="video-off" size={30} color="black" /> : <Feather name="video" size={30} color="black" />}
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: SunsetColors.background.dark,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
    color: SunsetColors.text.light,
  },
  camera: {
    flex: 1,
  },
  topButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
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
  button: {
    alignItems: 'center',
    backgroundColor: SunsetColors.interactive.button,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
    ...SunsetUtils.createShadow(SunsetColors.primary.sunset, 0.3),
  },
  captureButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: SunsetColors.interactive.button,
    ...SunsetUtils.createShadow(SunsetColors.interactive.button, 0.4),
    shadowRadius: 6,
    elevation: 8,
  },
  recordingButton: {
    backgroundColor: SunsetColors.interactive.recording,
    borderWidth: 2,
    borderColor: SunsetColors.primary.golden,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
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
  },
  capturedImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: '90%',
    height: '80%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: SunsetColors.interactive.button,
  },
  fullScreenImageContainer: {
    flex: 1,
    backgroundColor: SunsetColors.background.dark,
  },
  fullScreenImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});
