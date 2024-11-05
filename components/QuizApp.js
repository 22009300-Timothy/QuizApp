import React, {useState} from 'react';
import {View, Text, TextInput, Image, ScrollView, StyleSheet,  Alert, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import RNPickerSelect from 'react-native-picker-select';

const InputBox = ({label, onChangeText}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} onChangeText={onChangeText} placeholder="Enter your name" />
        </View>
    );
};

const Question = ({imageSource, questionText, options, onAnswerChange}) => {
    return (
        <View style={styles.questionContainer}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.questionText}>{questionText}</Text>

            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={onAnswerChange}
                    items={options}
                    style={{inputAndroid: styles.pickerText, placeholder: {color: '#000000', fontSize: 10,}}}
                    placeholder={{ label: "Select an answer", value: null }}
                />
            </View>
        </View>
    );
};

const QuizApp = () => {
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    const correctAnswers = { 1: 'Bee', 2: 'Crocodile', 3: 'Deer', 4: 'Pride', 5: 'Owl' };

    const checkAnswers = () => {
        const unansweredQuestions = Object.values(answers).some(answer => answer === '');
        if (unansweredQuestions) {
            Alert.alert("Please answer all questions before submitting.");
            return;
        }

        let correctCount = 0;
        for (let key in correctAnswers) {
            if (answers[key] === correctAnswers[key]) correctCount++;
        }

        let message;
        if (correctCount === 5) {
            message = "Excellent! You got a perfect score of 5!";
        } else if (correctCount === 4) {
            message = "Great job! You got 4 out of 5 correct!";
        } else if (correctCount === 3) {
            message = "Good effort! You scored 3 out of 5.";
        } else if (correctCount === 2) {
            message = "Not bad! You got 2 correct answers.";
        } else if (correctCount === 1) {
            message = "You got 1 answer right. Keep practicing!";
        } else {
            message = "It looks like you need a bit more practice. Try again!";
        }
        Alert.alert(message);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Icon name="paw" size={24} color="#FFFFFF" style={styles.icon} />
                <Text style={styles.title}>Animal Quiz</Text>
                <Icon name="paw" size={24} color="#FFFFFF" style={styles.icon} />
            </View>

            <InputBox label="Username:" onChangeText={setUsername} />
            {username ? <Text style={styles.welcomeText}>Hello, {username}!</Text> : null}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.questionWrapper}>
                    <Question
                        imageSource={require('../img/bee.jpg')}
                        questionText="What animal is this?"
                        options={[
                            { label: 'Wasp', value: 'Wasp' },
                            { label: 'Bee', value: 'Bee' },
                            { label: 'Hornet', value: 'Hornet' },
                        ]}
                        onAnswerChange={(value) => setAnswers({ ...answers, 1: value })}
                    />
                </View>

                <View style={styles.questionWrapper}>
                    <Question
                        imageSource={require('../img/crocodile.jpg')}
                        questionText="What animal is this?"
                        options={[
                            { label: 'Alligator', value: 'Alligator' },
                            { label: 'Monitor Lizard', value: 'Monitor Lizard' },
                            { label: 'Crocodile', value: 'Crocodile' },
                        ]}
                        onAnswerChange={(value) => setAnswers({ ...answers, 2: value })}
                    />
                </View>

                <View style={styles.questionWrapper}>
                    <Question
                        imageSource={require('../img/deer.jpg')}
                        questionText="What animal is this?"
                        options={[
                            { label: 'Antelope', value: 'Antelope' },
                            { label: 'Deer', value: 'Deer' },
                            { label: 'Gazelle', value: 'Gazelle' },
                        ]}
                        onAnswerChange={(value) => setAnswers({ ...answers, 3: value })}
                    />
                </View>

                <View style={styles.questionWrapper}>
                    <Question
                        imageSource={require('../img/lion.jpg')}
                        questionText="A group of lions is called a _________"
                        options={[
                            { label: 'Pack', value: 'Pack' },
                            { label: 'Pride', value: 'Pride' },
                            { label: 'Herd', value: 'Herd' },
                            { label: 'Flock', value: 'Flock' },
                        ]}
                        onAnswerChange={(value) => setAnswers({ ...answers, 4: value })}
                    />
                </View>

                <View style={styles.questionWrapper}>
                    <Question
                        imageSource={require('../img/questionmark.jpg')}
                        questionText="This nocturnal animal is known for its ability to rotate its head almost 180 degrees and hunts small animals at night. What is it?"
                        options={[
                            { label: 'Owl', value: 'Owl' },
                            { label: 'Eagle', value: 'Eagle' },
                            { label: 'Bat', value: 'Bat' },
                            { label: 'Hawk', value: 'Hawk' },
                        ]}
                        onAnswerChange={(value) => setAnswers({ ...answers, 5: value })}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={checkAnswers}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 60,
        marginBottom: 20,
        width: 370,
        alignSelf: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    icon: {
        marginHorizontal: 10
    },
    welcomeText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#000000',
        alignSelf: 'center'
    },
    inputContainer: {
        width: '90%',
        marginBottom: 15,
        alignSelf: 'center'
    },
    label: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#ffffff',
    },
    questionContainer: {
        width: '90%',
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 15,
        borderRadius: 10
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
        textAlign: 'center'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 300,
        height: 40,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    pickerText: {
        fontSize: 16,
        color: '#000000'
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
        height: 40,
        justifyContent: 'center'
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    questionWrapper: {
        width: '90%',
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center'
    }
});

export default QuizApp;
