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
            <ScrollView style={{ paddingLeft: 5 }}>
                <Text style={styles.helpText}>1. Tap "Fixed" and select the target pitch.</Text>
                <Text style={styles.helpText}>2. Press "Start" to begin the measurement session.</Text>
                <Text style={styles.helpText}>3. Start singing the target pitch steadily.</Text>
                <Text style={styles.helpText}>4. When you think you've hit the pitch perfectly, press "Measure" at that exact moment.</Text>
                <Text style={styles.helpText}>5. Pass the phone to the next person.</Text>
                <Text style={styles.helpText}>6. Repeat steps 3–5 for each participant.</Text>
                <Text style={styles.helpText}>7. When everyone is done, tap "Finish" to see the results.</Text>

                <Text style={[styles.helpText, { fontWeight: 'bold' }]}>Notice:</Text>

                <Text style={styles.noticeText}>
                    This app is not a precision tuning tool.{"\n"}
                    The pitch detection used in this app is based on a simplified{" "}
                    <Text
                        style={styles.linkText}
                        onPress={() =>
                            Linking.openURL(
                                'https://pubs.aip.org/asa/jasa/article-abstract/111/4/1917/547221/YIN-a-fundamental-frequency-estimator-for-speech'
                            )
                        }
                    >
                        YIN algorithm
                    </Text>.
                </Text>

                <Text style={styles.noticeText}>
                    The full source code of this app is available on{" "}
                    <Text
                        style={styles.linkText}
                        onPress={() =>
                            Linking.openURL(
                                'https://github.com/tyano463/tone_hunter'
                            )
                        }
                    >
                        GitHub
                    </Text>.
                </Text>

                <Text style={styles.noticeText}>
                    This app is a game for measuring the pitch of human singing voices.{"\n"}
                    It is not intended for tuning or evaluating musical instruments.{"\n"}
                    Please do not use the results of this app to judge whether an instrument is in tune,{" "}
                    or bring your instrument to a music shop based on the pitch shown in this app.
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
    },
    helpText: {
        fontSize: 18,
        lineHeight: 20,
        marginBottom: 8,
    },
    noticeText: {
        fontSize: 18,
        lineHeight: 24,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    }
});

export default HelpScreen