import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';


const Stack = createStackNavigator();

class Main extends Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                 <Stack.Screen
                    name="Home"
                    component={Home}
                />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Main;