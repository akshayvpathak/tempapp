import React,{Component} from 'react';
import {
    withTheme
} from 'react-native-paper';
import { CheckBox } from 'react-native-elements'

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
class CheckboxWidget extends Component{
    constructor(props){
        super(props);
        this.state= {
            answer: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
            this.setState({
                answer: !this.state.answer
            })
            const myanswer = {
                question: this.props.question,
                answer: this.state.answer
            }
            this.props.addAnswer(myanswer);
    }
    render(){
        const question = this.props.question;
        return(
            <View style={styles.formfield}>   
            <CheckBox
  title={question.question}
 
  checked={this.state.answer}
  onPress={this.handleChange}
/>            
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


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(CheckboxWidget));
