import React from 'react';
import {View,StyleSheet,ScrollView,Animated } from 'react-native';
import { Slider } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';


import DateTimePicker from '@react-native-community/datetimepicker';


import {
    Text ,
    Title,
    HelperText,
    TextInput,
    Button,
    withTheme,
    ActivityIndicator,
    Colors,
    Snackbar,
    RadioButton
} from 'react-native-paper';
export const Home = () => {
    const [value, setValue] = React.useState('first');
    const [range, setRange] = React.useState(25);
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const  _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: true,
            base64: true,
            copyToCacheDirectory: true
        });
        let fileBase64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64'  });
        console.log(fileBase64);
      alert(result.uri);
      console.log(result);
	}
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(selectedDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
    return(
        <ScrollView style={styles.container}>
            <Text>
            What is Your pets name and what happen if question itself long then how it will handle by form?
            </Text>
            <TextInput
                      label="answer" 
                      mode="outlined"
                      dense
                />
                <Text>
                    What is Your Gender?
                </Text>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View>
                        <RadioButton.Item label="Male" value="first" />
                    </View>
                    <View>
                        <RadioButton.Item label="Female" value="second" />
                    </View>
                </RadioButton.Group>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={range}
                    onValueChange={value => setRange(value)}
                    maximumValue={50}
                    minimumValue={20}
                    step={1}
                />
                <Text>Value: {range}</Text>
                </View>
                
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                    <View>
                        <Button color='blue' mode='contained' onPress={showDatepicker}>
                        Show date picker!
                            </Button> 
                    </View>
                    <View>
                        <Button  color='blue' mode='contained' onPress={showTimepicker}  >
                        Show time picker!</Button>
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </View>
                <Button  color='blue' mode='contained' onPress={_pickDocument}  >
                        Pick Document!</Button>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 20,
        marginVertical: 40,
    },
})