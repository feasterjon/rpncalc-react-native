import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { rpn } from './components/jrpncalc/rpn';

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
      "symbol": "\u005F",
      "value": " "
    },
    {
      "symbol": "=",
      "value": "="
    }
  ];

  function calculator() {
    let result = rpn(currentNumber).toString();
    setCurrentNumber(result)
    return
  }

  function handleInput(buttonPressed) {
    if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      Vibration.vibrate(5);
      setCurrentNumber(currentNumber + buttonPressed)
      return
    }
    else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.' || buttonPressed === ' ') {
      Vibration.vibrate(5);
    }
    switch(buttonPressed) {
      case 'DEL':
        Vibration.vibrate(5);
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'C':
        Vibration.vibrate(5);
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        Vibration.vibrate(5);
        setLastNumber(currentNumber)
        calculator()
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }
  
  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#00b9d6',
      margin: 40,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 40,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '54%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    }
  });
    
  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button.value === '=' || button.value === '/' || button.value === '*' || button.value === '-' || button.value === '+' ?
          <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: '#00b9d6'} ]} onPress={() => handleInput(button.value)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button.symbol}</Text>
          </TouchableOpacity>
          /*
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '24%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          */
          :
          button.value === 'DEL' ?
          <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: button.value === '.' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '37%'} ]} onPress={() => handleInput(button.value)}>
            <Text style={styles.textButton}>{button.symbol}</Text>
          </TouchableOpacity>
          :
          button.value === 'C' ?
          <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: typeof(button.value) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'} ]} onPress={() => handleInput(button.value)}>
            <Text style={styles.textButton}>{button.symbol}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button.value} style={[styles.button, {backgroundColor: typeof(button.value) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed' } ]} onPress={() => handleInput(button.value)}>
            <Text style={styles.textButton}>{button.symbol}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  
}
