import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import licenses from '../assets/licenses.json';

const LicensesScreen = ({ navigation }) => {
    const [licenseList, setLicenseList] = useState([]);

    useEffect(() => {
        const entries = Object.entries(licenses).map(([pkg, info]) => ({
            name: pkg,
            license: info.licenses,
            repository: info.repository || 'N/A',
        }));
        setLicenseList(entries);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.back_button} >
                <Button title="Go Back" onPress={() => navigation.navigate('Help')} />
            </View>
            <Text style={styles.title}>Open Source Licenses</Text>
            <ScrollView style={styles.scroll}>
                {licenseList.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.license}>{item.license}</Text>
                        <Text style={styles.repo}>{item.repository}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default LicensesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 48,
        backgroundColor: '#fff',
    },
    back_button: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    scroll: {
        flex: 1,
        marginBottom: 16,
    },
    item: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    license: {
        fontSize: 14,
        color: '#333',
    },
    repo: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
});
