import React,{Component} from 'react';
import {
    Text,
    withTheme,
} from 'react-native-paper';
import Slider from '../../rn-range-slider';
import Label from '../../slider/Label';
import Notch from '../../slider/Notch';
import Rail from '../../slider/Rail';
import RailSelected from '../../slider/RailSelected';
import Thumb from '../../slider/Thumb';

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
class SliderWidget extends Component{
    constructor(props){
        super(props);
        this.state= {
            answer:{
                min: '',
                max: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
        this.renderRail = this.renderRail.bind(this);
        this.renderRailSelected = this.renderRailSelected.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.renderNotch = this.renderNotch.bind(this);
    }
        renderThumb = () =>  <Thumb/>;
        renderRail = () => <Rail/>;
        renderRailSelected = () => <RailSelected/>;
        renderLabel = value => <Label text={value}/>;
        renderNotch = () => <Notch/>;
    handleChange(min,max){
        console.log(min);
        console.log(max);
        this.setState({
            answer:{
                min,
                max
            }
        })
        const myanswer = {
            question: this.props.question,
            answer: this.state.answer
        }
        this.props.addAnswer(myanswer);
        //console.log(this.props.Answers);
    }
   
    render(){
        const question = this.props.question;
        return(
            <View style={styles.formfield}> 
                <Text style={styles.textfield}>
                {question.question}
                </Text>
                <Slider
                floatingLabel
                disableRange={question.type=='range'?false:true}
                renderThumb={this.renderThumb}
                renderRail={this.renderRail}
                renderRailSelected={this.renderRailSelected}
                renderLabel={this.renderLabel}
                renderNotch={this.renderNotch}
                onValueChanged={this.handleChange}
                gravity={'center'}
                min={question.min}
                max={question.max}
                step={question.step}
                selectionColor={this.props.theme.colors.primary}
                blankColor="#f618"
                />
            <View style={styles.horizontalContainer}>
                <Text style={styles.valueText}>{this.state.answer.min}</Text>
                <Text style={styles.valueText}>{this.state.answer.max}</Text>
            </View>
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
    },
    valueText: {
        color: 'blue',
        fontSize: 20,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
})


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(SliderWidget));
