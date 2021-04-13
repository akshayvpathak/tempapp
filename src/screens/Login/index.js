import React,{Component} from 'react';
import {View ,StyleSheet} from 'react-native';
import {
    Title,
    HelperText,
    TextInput,
    Button,
    withTheme,
    ActivityIndicator,
    Colors,
    Snackbar
} from 'react-native-paper';

import {loginUser} from '../../redux/ActionCreators/LoginUser';
import { connect } from 'react-redux';
import { AsyncStorage,Platform } from 'react-native';


const mapStateToProps = state => {
    return {
      User: state.LoginUser,
    };
};
  
  
const mapDispatchToProps = (dispatch) => ({
    loginUser: (user,history) => { dispatch(loginUser(user,history)) },
});

const Loading = (props) =>{
    if(props.isFetching){
      return(
        <View style={props.style}>
            <ActivityIndicator animating={true}
             color={Colors.red800}
             size="large"
            />
        </View>
      );
     }
      else{
        return(
          <View></View>
        )
      }
}
const Error = (props) =>{
    if(props.error){
      return(
          <View>
            <Snackbar
                    visible={props.error}
                    duration={Infinity}
            >
                {props.error}
            </Snackbar>
          </View>
      );
     }
      else{
        return(
          <View></View>
        )
      }
  }
class Login extends Component{
    constructor(props){
        super(props);
        this.state= {
          email: '',
          password: '',
          touched: {
            email: false,
            password: false
        }
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.getToken = this.getToken.bind(this);

    }

    async getToken(){
        try{
            const value =  await AsyncStorage.getItem('refreshtoken');
            return value;
        }
        catch(err){
            console.log(err);
        }
    }


    handleLogin(event){
        event.preventDefault();
        this.props.loginUser({email_id: this.state.email, password: this.state.password},this.props.navigation)
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
    }


    validate(email){
        const errors = {
            email: '',
        }
        if(this.state.touched.email && email.split('').filter(x => x=== '@').length !== 1)
        {
            errors.email = 'Email Should Contain @ Symbol';
        }
        return errors;
    }
    async componentDidMount(){
        if(Platform.OS === 'web' && localStorage.getItem('refreshtoken')){
            this.props.navigation.navigate('Home');
       }else if(await this.getToken()){
            this.props.navigation.navigate('Home');
        }
    }

    render(){
        const errors = this.validate(this.state.email);
        
        return(
            <View style={styles.container}>
                <Loading isFetching={this.props.User.isFetching} style={styles.loading} />
                <Error error={this.props.User.error} />
                <Title style={
                    {
                        color: this.props.theme.colors.primary,
                        textAlign: 'center'
                    }
                }>
                    LOGIN
                </Title>
                <View style={styles.formfield}>
                <TextInput
                      label="Email" 
                      mode="outlined"
                      dense
                      value={this.state.email} 
                      onBlur = {this.handleBlur('email')}
                      onChangeText={(email) => this.setState({email})}
                      error = {errors.email !== ''}
                />
                <View>
                    <HelperText type="error" visible={errors.email !== ''}>
                    {errors.email} 
                    </HelperText>
                </View>
                </View>
               <View style={styles.formfield}>
               <TextInput
                  label="Password" 
                  mode="outlined"
                  dense
                  secureTextEntry={true}
                  value={this.state.password} 
                  onBlur = {this.handleBlur('password')}     
                  onChangeText={(password) => this.setState({password})}
                  />
               </View>
               <View style={styles.formfield}>
               <Button
                   mode="contained"
                   compact
                   dark
                   onPress= {this.handleLogin}
                   >
                    Login
                 </Button>
               </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
    },
    formfield:{
        marginHorizontal: 10,
        marginVertical: 10
    },
    loading:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 99999,
    }
})
export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Login));