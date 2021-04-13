import React,{Component} from 'react';
import {
    Text,
    withTheme,
    Button
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {addAnswer} from '../../redux/ActionCreators/Answers';

const mapStateToProps = state => {
    return {
      Answers: state.Answers,
    };
};

const mapDispatchToProps = (dispatch) => ({
    addAnswer: (answer) => { dispatch(addAnswer(answer)) },
});
class DateFieldWidget extends Component{
    constructor(props){
        super(props);
        this.state= {
            answer: new Date(),
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.displayTimePicker = this.displayTimePicker.bind(this);
    }

    displayTimePicker(){
        this.setState({
            show: !this.state.show
        })
    }
    handleChange(event,answer){
        this.setState({
            show: !this.state.show
        })
        if(answer){
            this.setState({
                answer
            })
            const myanswer = {
                question: this.props.question,
                answer: this.state.answer
            }
            this.props.addAnswer(myanswer);
            console.log(this.props.Answers);
        }
       
    }
   
    render(){
        const question = this.props.question;
        return(
            <View style={styles.formfield}> 
             <Text style={styles.textfield}>
            {question.question}
            </Text>
            <Button 
            icon="calendar-month"
            color={this.props.theme.colors.primary}
            mode='contained'
            onPress={ this.displayTimePicker}  >
                SELECT DATE
            </Button>
            {
                this.state.show &&
                <DateTimePicker
                testID="dateTimePicker"
                value={this.state.answer}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={this.handleChange}
            />
            }
           
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    formfield:{
        marginHorizontal: 10,
        marginVertical: 10
    },
    textfield:{
        marginBottom: 10,
        fontSize: 16,
    }
})


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(DateFieldWidget));
