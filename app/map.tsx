import * as ExpoLocation from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Konum izni verilmedi');
        return;
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync({});
      if (currentLocation?.coords) {
        setUserLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      }
    })();
  }, []);

  const handleMarkerPress = (marker: {
    coordinate: { latitude: number; longitude: number };
    title: string;
    description: string;
  }) => {
    setDestination(marker.coordinate);
    setSelectedMarkerInfo({ title: marker.title, description: marker.description });
    setModalVisible(true);
  };

  const polygonCoords = [
    { latitude: 41.044902, longitude: 28.995030 },
    { latitude: 41.044538, longitude: 28.995725 },
    { latitude: 41.043889, longitude: 28.995386 },
    { latitude: 41.044166, longitude: 28.994708 },
  ];

  const markers = [
    {
      title: 'Yabancı Diller',
      coordinate: { latitude: 41.045223717333556, longitude: 28.9948791953575 },
      description: 'İTÜ Yabancı Diller Yüksekokulu',
    },
    {
      title: 'İşletme Fakültesi',
      coordinate: { latitude: 41.04378339729216, longitude: 28.99663401751283 },
      description: 'İTÜ İşletme Fakültesi',
    },
    {
      title: 'Türk Musikisi',
      coordinate: { latitude: 41.04474168677029, longitude: 28.996721950938706 },
      description: 'İTÜ Türk Musikisi Devlet Konservatuvarı',
    },
  ];

  return (
    <View style={styles.container}>
      {!userLocation ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
          >
            <Polygon
              coordinates={polygonCoords}
              strokeColor="#0000FF"
              fillColor="rgba(0, 0, 255, 0.1)"
              strokeWidth={2}
            />

            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                onPress={() => handleMarkerPress(marker)}
              />
            ))}

            {destination && userLocation && (
              <Polyline
                coordinates={[userLocation, destination]}
                strokeColor="#007AFF"
                strokeWidth={4}
              />
            )}
          </MapView>

          {/* Modal */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedMarkerInfo?.title}</Text>
                <Text style={styles.modalDesc}>{selectedMarkerInfo?.description}</Text>
                <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#fff' }}>Kapat</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
