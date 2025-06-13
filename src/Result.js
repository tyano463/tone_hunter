
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import util from './utils';
import fs from './FileAccess';
import db from './db';

const ResultScreen = ({ navigation }) => {
    let num = fs.load_settings("result_people")
    if (isNaN(num)) {
        num = 7
    }
    console.log("n:" + num)
    const results = db.getAll().map((entry) => {
        const targetHz = util.midiToFrequency(entry.targetTone);
        const diff = Math.abs(entry.measuredPitch - targetHz);
        const diffCent = util.calcDiffCent(entry.measuredPitch, targetHz);
        return { ...entry, diff, diffCent };
    }).sort((a, b) => a.diffCent - b.diffCent);

    return (
        <>
            <Text> Result</Text>
            {results.map((v) => {
                return (
                    <View key={v.order}>
                        <Text>{"order:" + v.order}</Text>
                        <Text>{"cent:" + v.diffCent}</Text>
                        <Text>{"diff:" + v.diff}</Text>
                        <Image source={{ uri: v.photoPath }} style={styles.photo} />
                    </View>
                )
            })}
            <Button
                title='Next Game'
                onPress={() => navigation.navigate('Home')}
            ></Button>
        </>
    )
}

const styles = StyleSheet.create({
    photo: {
        width: 100,
        height: 100,
    }
})

export default ResultScreen