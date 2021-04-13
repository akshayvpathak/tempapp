import React ,{ Component} from 'react';
import {
    HelperText,
    TextInput,
    withTheme,
    Text
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
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
class TextFieldWidget extends Component{
    constructor(props){
        super(props);
        this.state= {
            answer: '',
            touched: {
              answer: false,
          }
        }
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
        const answer = {
            question: this.props.question,
            answer: this.state.answer
        }
        this.props.addAnswer(answer);
    }
    validate(answer){
        const errors = {
            answer: '',
        }
        if(this.state.touched.answer && answer.length > this.props.question.max_character)
        {
            errors.answer = `Answer Should Not Contain More than ${this.props.question.max_character} character`;
        }
        if(this.state.touched.answer && answer.length < this.props.question.min_character)
        {
            errors.answer = `Answer Should Not Contain Less than ${this.props.question.min_character} character`;
        }
        return errors;
    }


    handleChange = (answer) =>{
        this.setState({answer});
    }

    render(){
        const errors = this.validate(this.state.answer);
        const question = this.props.question;
        return(
            <View style={styles.formfield}>
            <Text style={styles.textfield}>
            {question.question}
            </Text>
            <TextInput
                  label="Answer" 
                  mode="outlined"
                  dense
                  value={this.state.answer} 
                  onBlur = {this.handleBlur('answer')}
                  onChangeText={(answer) => this.handleChange(answer)}
                  error = {errors.answer !== ''}
            />
            {
                errors.answer != '' &&
                <HelperText>
                    {errors.answer}
                </HelperText>
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
export default withTheme(connect(mapStateToProps, mapDispatchToProps)(TextFieldWidget));