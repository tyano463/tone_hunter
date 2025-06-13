import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, PhotoFile } from 'react-native-vision-camera';
import { NativeEventEmitter, NativeModules } from 'react-native';
import util from './utils';

const MeasureScreen = ({ navigation, route }) => {
    const { order, tone, individual } = route.params
    const device = useCameraDevice('front')
    const cameraRef = useRef(null)

    const [selectedTone, setSelectedTone] = useState(tone)

    console.log("order: " + order + " tone:" + tone + " indiv:" + individual)
    const emitter = new NativeEventEmitter(NativeModules.ToneEventEmitter);
    useEffect(() => {
        const sub = emitter.addListener('onMeasureUpdate', (data) => {
            console.log('Update:', data);
        });

        return () => {
            sub.remove();
        };
    }, []);

    const confirm_measure = () => {

    }

    const shoot = async () => {
        try {
            if (cameraRef.current == null) {
                console.log('Camera not ready');
                return;
            }

            const photo = await cameraRef.current.takePhoto({
                flash: 'off',
            });

            console.log(`Photo saved at: ${photo.path}`);

        } catch (e) {
            console.log(`Failed to take photo: ${e.message}`);
        }
    };


    if (device == null) {
        return <Text>Initializing the camera......</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraWrapper}>
                <Camera ref={cameraRef} style={styles.camera} device={device} isActive={true} photo={true} />
                <Text style={styles.orderText}>order: {order}</Text>
                <Text style={styles.targetText}>{"" + util.midiToNoteName(selectedTone)}</Text>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        confirm_measure()
                        shoot()
                        navigation.replace('Measure', { order: order + 1, tone: tone, individual: individual })
                    }}
                >
                    <Text style={styles.nextButtonText}>Measure</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.buttons}>
                <Button
                    title="Finish"
                    onPress={() => {
                        const Mic = require('./MicCheck').default
                        Mic.stopMeasure()
                        navigation.navigate('Result', { order: order + 1, tone: tone, individual: individual })
                    }}
                />
            </View>
        </View>
    );
};

export default MeasureScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    orderText: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        overflow: 'hidden',
    },
    targetText: {
        position: 'absolute',
        top: 60,
        fontSize: 64,
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        overflow: 'hidden',
    },
    cameraWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
    nextButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttons: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
