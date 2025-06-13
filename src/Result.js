
import React from 'react';
import { Text, Button } from 'react-native';

const ResultScreen = ({ navigation }) => {
    return (
        <>
            <Text> Result</Text>
            <Button
                title='Next Game'
                onPress={() => navigation.navigate('Home')}
            ></Button>
        </>
    )
}

export default ResultScreen