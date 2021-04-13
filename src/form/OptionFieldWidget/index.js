import React ,{ Component} from 'react';
import {
    withTheme,
    Text,
    RadioButton
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
class OptionFieldWidget extends Component{
    constructor(props){
        super(props);
        this.state= {
            answer: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (answer) =>{
        console.log(answer);
        this.setState({answer});
        const myanswer = {
            question: this.props.question,
            answer
        }
        this.props.addAnswer(myanswer);
    }
    render(){
        const question = this.props.question;
        
        return(
            <View style={styles.formfield}>
            <Text style={styles.textfield}>
                {question.question}
            </Text>
            <RadioButton.Group onValueChange={this.handleChange} value={this.state.answer}>
                {
                    question.options.map((option) =>{
                        return(
                                <RadioButton.Item label={option} value={option} mode='android' color={this.props.theme.colors.primary} />      
                        )
                    })
                }
            </RadioButton.Group>                
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
export default withTheme(connect(mapStateToProps, mapDispatchToProps)(OptionFieldWidget));