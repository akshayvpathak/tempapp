import React,{Component} from 'react';
import {View,StyleSheet,ScrollView} from 'react-native';
import TextFieldWidget from '../../form/TextFieldWidget';
import CheckboxWidget from '../../form/CheckboxWidget';
import OptionFieldWidget from '../../form/OptionFieldWidget';
import DateFieldWidget from '../../form/DateFieldWidget';
import TimeFieldWidget from '../../form/TimeFieldWidget';
import SliderWidget from '../../form/SliderWidget';
import SelectFieldWidget from '../../form/SelectFieldWidget';
import {
    Title,
    HelperText,
    TextInput,
    Button,
    withTheme,
    Text
} from 'react-native-paper';

const Form = 
   [
       {
        'id': 1,
        'question': 'What is your age?',
        'type': 'text',
        'min_character': 3,
        'max_character': 5,
       },
       {
        'id': 2,
        'question': 'Your Gender?',
        'type': 'option',
        'options': ['Male','Female']
        },
        {
            'id': 3,
            'question': 'Agree On Our Terms & Conditions',
            'type': 'checkbox',
        },
        {
            'id': 4,
            'question': 'Choose Your Birthdate',
            'type': 'date',
        },
        {
            'id': 5,
            'question': 'Choose Your Birthtime',
            'type': 'time',
        },
        {
            'id': 6,
            'question': 'Rate Your Skill in React',
            'type': 'slider',
            'min': 1,
            'max': 10,
            'step': 1
        },
        {
            'id': 7,
            'question': 'Your Annual Income is',
            'type': 'range',
            'min': 100000,
            'max': 500000,
            'step': 10000
        },
        {
            'id': 7,
            'question': 'Select Your Skill',
            'type': 'select',
            'multiple': true,
            'options':['HTML','JS','CSS']
        }
   ]

   const HandleQuestions = (props) =>{
       const {question} = props;
       if(question.type == 'text')
        return(HandleTextQuestion(question));
       if(question.type == 'option')
        return(HandleOptionQuestion(question));
        if(question.type == 'checkbox')
        return(HandleCheckboxQuestion(question));
        if(question.type == 'date')
        return(HandleDateQuestion(question));
        if(question.type == 'time')
        return(HandleTimeQuestion(question));
        if(question.type == 'slider' || question.type == 'range' )
        return(HandleSliderQuestion(question));
        if(question.type == 'select')
        return(HandleSelectQuestion(question));
        
   }
   const HandleTextQuestion = (question) => {
        return(
             <TextFieldWidget question={question} />
        )
   }
   const HandleOptionQuestion = (question) => {
       return(
           <OptionFieldWidget question={question} />
       )
   }

   const HandleCheckboxQuestion = (question) =>{
       return(
           <CheckboxWidget question={question} />
       )
   }

   const HandleDateQuestion = (question) =>{
       return(
           <DateFieldWidget question={question} />
       )
   }

   const HandleTimeQuestion = (question) => {
       return(
           <TimeFieldWidget question={question} />
       )
   }

   const HandleSliderQuestion = (question) =>{
       return(
           <SliderWidget question={question} />
       )
   }

   const HandleSelectQuestion = (question) =>{
       return(
           <SelectFieldWidget question={question} />
       )
   }
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                 <Title style={
                    {
                        color: this.props.theme.colors.primary,
                        textAlign: 'center'
                    }
                }>
                    Form
                </Title>
                {
                    Form.map((question)=>{
                        return(
                            <HandleQuestions question={question} key={question.id} />
                        )
                    })
                }
                 <Button
                   mode="contained"
                   compact
                   dark
                   >
                    SUBMIT
                 </Button>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
        marginVertical: 40,
    },
})
export default withTheme(Home);