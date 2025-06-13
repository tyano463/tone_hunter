import React from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';

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