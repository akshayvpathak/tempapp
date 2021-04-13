import React ,{ Component} from 'react';
import {
    withTheme,
    Text,
} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import {addAnswer} from '../../redux/ActionCreators/Answers';
import CustomMultiPicker from "react-native-multiple-select-list";



const mapStateToProps = state => {
    return {
      Answers: state.Answers,
    };
};


const mapDispatchToProps = (dispatch) => ({
    addAnswer: (answer) => { dispatch(addAnswer(answer)) },
});
class SelectFieldWidget extends Component{
    constructor(props){
        super(props);
        this.state= {
            answer: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (answer) =>{
        this.setState({answer});
       
        console.log(answer);
        const myanswer = {
            question: this.props.question,
            answer: answer.slice(1)
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
            <CustomMultiPicker
                options={question.options}
                search={false} // should show search bar?
                multiple={question.multiple} //
                returnValue={"label"} // label or value
                callback={this.handleChange} // callback, array of selected items
                rowBackgroundColor={"#eee"}
                rowHeight={40}
                rowRadius={5}
                iconColor={this.props.theme.colors.primary}
                iconSize={30}
                selectedIconName={"ios-checkmark-circle-outline"}
                unselectedIconName={"ios-radio-button-off-outline"}
                scrollViewHeight={130}
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
export default withTheme(connect(mapStateToProps, mapDispatchToProps)(SelectFieldWidget));