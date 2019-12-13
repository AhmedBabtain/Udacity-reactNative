import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import middleware from "./redux/middleware";
import { receiveDecks } from "./redux/actions";
import { mockData, getDecks } from "./utils/api";

import { createAppContainer, } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import DeckList from "./components/Decks/DeckList";
import AddDeck from "./components/Decks/AddDeck";

import DeckView from "./components/Decks/DeckView";
import AddCard from './components/Card/AddCard';
import StartQuiz from "./components/Quizzes/StartQuiz";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { primaryText, primary, secondary, primaryDark, red, secondaryDark } from './utils/colors';
import { setLocalNotification } from "./utils/common";
const store = createStore(reducer, middleware)


const TabNavigator = createBottomTabNavigator({
  Home: DeckList,
  AddDeck: AddDeck,
  
  
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `animation${focused ? '' : '-outline'}`;
      } else if (routeName === 'AddDeck') {
        iconName = `plus-circle${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <MaterialCommunityIcons name={iconName} size={25} color={primary} />;
    },
    
  }),
  tabBarOptions: {
    activeTintColor: secondaryDark,
    inactiveTintColor: secondary,
  },
  
  
  
});

const StackNavigator = createStackNavigator({
  Home:TabNavigator,
  DeckView:DeckView,
  AddCard:AddCard,
  StartQuiz:StartQuiz
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: primary,
    },
    headerTintColor: primaryText,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

const AppContainer = createAppContainer(StackNavigator)

export default class App extends React.Component {
  
  componentDidMount() {
    getDecks().then(reuslt => store.dispatch(receiveDecks(reuslt)))
    
    setLocalNotification()
    
  }

  render() {

    return (
      <Provider store={store}>
        <AppContainer />     
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
