/*
Title: RPN Calculator
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-12-20
*/

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { RPN } from './components/jrpncalc';

export default function App() {
  
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  
  const buttons = [
    {
      "symbol": "C",
      "value": "C"
    },
    {
      "symbol": "\u232B",
      "value": "DEL"
    },
    {
      "symbol": "\u00F7",
      "value": "/"
    },
    {
      "symbol": "7",
      "value": 7
    },
    {
      "symbol": "8",
      "value": 8
    },
    {
      "symbol": "9",
      "value": 9
    },
    {
      "symbol": "\u00D7",
      "value": "*"
    },
    {
      "symbol": "4",
      "value": 4
    },
    {
      "symbol": "5",
      "value": 5
    },
    {
      "symbol": "6",
      "value": 6
    },
    {
      "symbol": "-",
      "value": "-"
    },
    {
      "symbol": "1",
      "value": 1
    },
    {
      "symbol": "2",
      "value": 2
    },
    {
      "symbol": "3",
      "value": 3
    },
    {
      "symbol": "+",
      "value": "+"
    },
    {
      "symbol": "0",
      "value": 0
    },
    {
      "symbol": ".",
      "value": "."
    },
    {
      "symbol": "\u005F\u005F",
      "value": " "
    },
    {
      "symbol": "=",
      "value": "="
    }
  ];

  function calc() {
    let expression = currentNumber.toString();
    let result = RPN(formatExpression(expression)).toString();
    setCurrentNumber(result);
    return
  }

  function handleInput(buttonPressed) {
    if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '\u00D7' || buttonPressed === '\u00F7') {
      Vibration.vibrate(5);
      setCurrentNumber(currentNumber + buttonPressed);
      return
    }
    else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.' || buttonPressed === ' ') {
      if (buttonPressed !== ' ' && validateNumbers(currentNumber + buttonPressed) === false) {
        return
      }
      Vibration.vibrate(5);
    }
    switch(buttonPressed) {
      case 'DEL':
        Vibration.vibrate(5);
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
        return
      case 'C':
        Vibration.vibrate(5);
        setLastNumber('');
        setCurrentNumber('');
        return
      case '=':
        Vibration.vibrate(5);
        setLastNumber(currentNumber);
        calc();
        return
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }
  
  function validateNumbers(expression) {
    let output = true;
    expression = expression.toString();
    let numbers = expression.split(' ');
    numbers.forEach((number) => {
      let numFragments = number.split('.');
      if (numFragments[0]) {
        if (numFragments[0].length > 15) {
          output = false;
          Alert.alert(
            null,
            'Maximum number of digits (15) exceeded.'
          );
          return output;
        }
      }
      if (numFragments[1]) {
        if (numFragments[1].length > 10) {
          output = false;
          Alert.alert(
            null,
            'Maximum number of digits after decimal point (10) exceeded.'
          );
          return output;
        }
      }
    });
    return output;
  }
  
  function formatNumbers(expression) {
    let output = '';
    expression = expression.toString();
    let numbers = expression.split(' ');
    numbers.forEach((number) => {
    let numFragments = number.split('.');
      numFragments[0] = numFragments[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      output += ' ' + numFragments.join('.');
    });
    return output;
  }
  
  function formatExpression(expression) {
    let output = expression.toString();
    output = output.replace(new RegExp(',', 'g'), '');
    output = output.replace(new RegExp('\u00D7', 'g'), '*');
    output = output.replace(new RegExp('\u00F7', 'g'), '/');
    return output;
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkMode ? '#2a2b2f' : '#f5f6f8',
      color: darkMode ? '#8c8d8f' : '#6e6e6e',
      flexDirection: 'column',
      flex: 1
    },
    top: {
      flexDirection: 'column',
      flex: 1
    },
    row: {
      flexDirection: 'row',
      flex: 1
    },
    theme: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flex: 1
    },
    history: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flex: 2
    },
    result: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flex: 1
    },
    resultText: {
      color: '#59a7e5',
      marginRight: 15,
      marginBottom: 10,
      marginLeft: 15,
      fontSize: 35,
      alignSelf: 'flex-end',
      flexWrap: 'wrap'
    },
    historyText: {
      color: darkMode ? '#8c8d8f' : '#6e6e6e',
      fontSize: 20,
      marginRight: 15,
      marginLeft: 15,
      alignSelf: 'flex-end',
      flexWrap: 'wrap'
    },
    themeButton: {
      backgroundColor: darkMode ? '#464749' : '#dfe4e8',
      alignSelf: 'flex-start',
      marginTop: 15,
      marginLeft: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25
    },    
    keypad: {
      backgroundColor: darkMode ? '#386e98' : '#d1e1f5',
      flex: 2
    },
    buttons: {
      width: '100%',
      height: '37%',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    button: {
      borderColor: darkMode ? '#6e6e6e' : '#dfe4e8',
      borderWidth: 0.375,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '54%',
      flex: 1
    },
    textButton: {
      color: darkMode ? '#8c8d8f' : '#6e6e6e',
      fontSize: 32
    }
  });
    
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.row}>
          <View style={styles.theme}>
            <TouchableOpacity style={styles.themeButton}>
              <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? '#fafafa' : '#6e6e6e'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
            </TouchableOpacity>
          </View>
          <View style={styles.history}>
            <Text style={styles.historyText}>{formatNumbers(lastNumber)}</Text>
          </View>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultText}>{formatNumbers(currentNumber)}</Text>
        </View>
      </View>
      <View style={styles.keypad}>
        <View style={styles.buttons}>
          {buttons.map((button) =>
            button.value === ' ' || button.value === '-' || button.value === '+' ?
            <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: darkMode === true ? '#1a1b1d' : '#fafafa'} ]} onPress={() => handleInput(button.value)}>
              <Text style={[styles.textButton, {color: '#59a7e5', fontSize: 32} ]}>{button.symbol}</Text>
            </TouchableOpacity>
            :
            button.value === '/' || button.value === '*' ?
            <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: darkMode === true ? '#1a1b1d' : '#fafafa'} ]} onPress={() => handleInput(button.symbol)}>
              <Text style={[styles.textButton, {color: '#59a7e5', fontSize: 32} ]}>{button.symbol}</Text>
            </TouchableOpacity>
            :
            button.value === '=' ?
            <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: '#59a7e5'} ]} onPress={() => handleInput(button.value)}>
              <Text style={[styles.textButton, {color: '#ffffff', fontSize: 32} ]}>{button.symbol}</Text>
            </TouchableOpacity>
            :
            button.value === 'DEL' ?
            <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: button.value === '.' ? darkMode ? '#1a1b1d' : '#fafafa' : darkMode === true ? '#1a1b1d' : '#fafafa', minWidth: '37%'} ]} onPress={() => handleInput(button.value)}>
              <Text style={[styles.textButton, {color: '#59a7e5', fontSize: 32} ]}>{button.symbol}</Text>
            </TouchableOpacity>
            :
            button.value === 'C' ?
            <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: typeof(button.value) === 'number' ? darkMode ? '#1a1b1d' : '#fafafa' : darkMode === true ? '#1a1b1d' : '#fafafa', minWidth: '36%'} ]} onPress={() => handleInput(button.value)}>
              <Text style={[styles.textButton, {color: '#e37f60', fontSize: 32} ]}>{button.symbol}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: typeof(button.value) === 'number' ? darkMode ? '#1a1b1d' : '#fafafa' : darkMode === true ? '#1a1b1d' : '#fafafa' } ]} onPress={() => handleInput(button.value)}>
              <Text style={styles.textButton}>{button.symbol}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
  
}
