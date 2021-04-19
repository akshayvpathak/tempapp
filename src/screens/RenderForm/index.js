import React,{Component} from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native';
import {
    Text,
    withTheme
} from 'react-native-paper';
import TextFieldWidget from '../../form/TextFieldWidget';
import {incrementPageNumber, decrementPageNumber} from '../../redux/ActionCreators/CurrentPage';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      CurrentPage: state.CurrentPage,
    };
  };
  
  
  const mapDispatchToProps = (dispatch) => ({
    incrementPageNumber: () => { dispatch(incrementPageNumber()) },
    decrementPageNumber: () => { dispatch(decrementPageNumber()) },
  });
const HandleQuestions = (props) =>{
    const {question} = props;
    if(question.type == 'text')
     return(HandleTextQuestion(question));
}
const HandleTextQuestion = (question) => {
     return(
          <TextFieldWidget question={question} />
     )
}
class RenderForm extends Component{
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
        this.goBack = this.goBack.bind(this);
        this.Form = this.Form.bind(this);
    }
   
    nextStep = () => {
        const { next, saveState } = this.props;
        this.props.incrementPageNumber();
        next();
      };
    
      goBack() {
        const { back } = this.props;
        this.props.decrementPageNumber();
        back();
      }

      Form(){
        const totalpage = this.props.CurrentPage.totalpage;
        const totalquestion = this.props.form.length;
        const currentpage = this.props.CurrentPage.currentpage;
        if(totalpage != currentpage)
        {
          const questions = this.props.form.slice(currentpage*3-3,currentpage*3);
          return questions;
        }
        else{
          const questions = this.props.form.slice(currentpage*3-3,totalquestion);
          return questions;
        }
       
      }
    
    render(){
      const questions = this.Form();
      console.log(questions);
        return(
            <View>
                <Text>
                    {this.props.CurrentPage.currentpage}
                </Text>
                {
                  this.props.CurrentPage.currentpage != this.props.CurrentPage.totalpage &&
                  <TouchableOpacity onPress={this.nextStep}>
                  <Text>Next</Text>
                  </TouchableOpacity>
                }
           
          {
            this.props.CurrentPage.currentpage != 1 && 
            <TouchableOpacity onPress={this.goBack}>
              <Text>Prev</Text>
            </TouchableOpacity>
          }

          {
                    questions.map((question)=>{
                        return(
                            <HandleQuestions question={question} key={question.id} />
                        )
                    })
                }
            </View>
        )
    }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(RenderForm));