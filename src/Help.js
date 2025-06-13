import React from 'react';
import { Button, View, Text, StyleSheet, ScrollView, Linking, Pressable, TouchableOpacity } from 'react-native';

const HelpScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Text style={styles.page_title}> Help</Text>
            <View style={styles.menu} >

                <Button
                    title='Go Back'
                    onPress={() => navigation.navigate('Home')}
                ></Button>
                <Button
                    title='Licenses'
                    onPress={() => navigation.navigate('Licenses')}
                />
            </View>
            <ScrollView>
                <Text>1. Tap "Fixed" and select the target pitch.</Text>
                <Text>2. Press "Start" and sing a note close to the selected pitch.</Text>
                <Text>3. When you're ready, press "Measure".</Text>
                <Text>4. Pass the phone to the next person.</Text>
                <Text>5. The next person should sing a note close to the same pitch.</Text>
                <Text>6. Repeat steps 4 and 5.</Text>
                <Text>7. The last person should tap "Finish".</Text>
                <Text>8. The results will be displayed.</Text>

                <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Notice:</Text>
                <Text>
                    This app is not a precision tuning tool.{"\n"}
                    The pitch detection used in this app is based on a simplified {' '}
                    <TouchableOpacity onPress={() => Linking.openURL('https://pubs.aip.org/asa/jasa/article-abstract/111/4/1917/547221/YIN-a-fundamental-frequency-estimator-for-speech')}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>YIN algorithm</Text>
                    </TouchableOpacity>{' '}.
                </Text>

                <Pressable
                    onPress={() =>
                        Linking.openURL(
                            'https://github.com/tyano463/tone_hunter/blob/main/ios/NativeInterface/yin_pitch_detector.c'
                        )
                    }
                >
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                        View source code on GitHub
                    </Text>
                </Pressable>

                <Text style={{ marginTop: 10 }}>
                    Please do not use this app as a substitute for musical instruments in games,{"\n"}
                    and do not bring your instrument to a music shop based on this app's results if it sounds out of tune.
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center"
    },
    page_title: {
        fontSize: 24,
    },
    menu: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
})

export default HelpScreen