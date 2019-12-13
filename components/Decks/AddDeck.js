import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../../redux/actions";
import * as api from "../../utils/api";
import * as common from "../../utils/common";
import { primaryLight, primaryDark, primaryText, primary, secondaryDark, secondary, secondaryText } from "../../utils/colors";
class AddDeck extends Component {
    state = {
        titleField: '',
        showMessage: '',
        temp: null

    }
    componentDidMount(){
        api.getDecks().then(reuslt => this.setState({temp:reuslt}))
    }
    static navigationOptions = {
        title: 'Add Deck',
    };

    handleTitleFieldChange = (input) => {

        this.setState({ titleField: input })
    }

    toDeckView = (key) => {
        // debugger
        this.props.navigation.navigate("DeckView", { deckId: key })

        // this.props.navigation.navigate("Home")
    }

    onPress = () => {
        const { titleField } = this.state
        if (this.state.titleField.trim() !== "") {
            
            const key = common.generateKey()
            const newDeck = {
                title: titleField,
                questions: []
            }
            //redux
            this.props.dispatch(addDeck(newDeck,key))
            
            //storage
            api.AddDeck({ title: titleField, questions: [] }, key)

            this.toDeckView(key)

            this.setState(() => ({
                titleField: '',
                showMessage: ''
            }))

        } else {
            alert('please enter Deck Title')
        }
    }


    render() {
        const { titleField } = this.state

        return <View style={[styles.container]}>
            <Text style={styles.deckTitle}>Deck Title {titleField}</Text>

            <TextInput
                style={styles.input}
                value={titleField}
                onChangeText={this.handleTitleFieldChange}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={this.onPress}
            >
                <Text style={{color:secondaryText}}> Create Deck </Text>
            </TouchableOpacity>
            <Text></Text>

        </View>
    } 

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    // marginTop: Constants.statusBarHeight,
     marginTop: 20,
     padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    },
    deckTitle:{
        marginBottom:20,
        fontSize:19,

    },
    item: {
        // backgroundColor: primaryLight,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // justifyContent: 'center',
        // alignItems: 'stretch',
        // borderColor:primaryDark,
        // borderRadius: 4,
        // borderWidth: 1,
      },
      title:{
        fontSize: 25,
        color:primaryText,
      },
      input:{
        padding:5,
        height:40,
        color:primaryText,
        borderColor:primaryDark,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
      },
      button:{
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:secondary,
        backgroundColor:secondary,
        color:secondaryText,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
      }
  });

function mapStateToProps() {

}

export default connect()(AddDeck)