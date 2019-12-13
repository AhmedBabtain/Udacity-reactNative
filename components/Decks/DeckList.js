import React,{Component} from "react";
import { View,Text, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import DeckItem from "./DeckItem";  
import { white, purple } from "../../utils/colors";
import { red } from "ansi-colors";

class DeckList extends Component{
    static navigationOptions = {
        title: 'Decks',
        fontSize: 100
    };

    onPressCard = () => {
        console.log("Ahmed")
    }
    render(){
        // console.log('this.props',this.props)

        const { deckIds } = this.props
        
        return <View style={styles.container}>

                <FlatList
                    data={deckIds}
                    renderItem={({ item }) => (
                    <DeckItem
                        id={item}
                       
                        navigator={this.props.navigation}
                    />
                    )}
                    keyExtractor={item => item}
            
                />

             {/* <Text >DeckList</Text> */}

            {/* {deckIds.map((id,key) => {
                return <DeckItem style={styles.item} key={key} id={id} navigator={this.props.navigation} />
            })} */}
           

            {/* <Text>debugging{JSON.stringify(deckIds)}</Text> */}
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    // marginTop: Constants.statusBarHeight,
     marginTop: 20,
    },
    
    title: {
      fontSize: 32,
    },
  });

function mapStateToProps(decks){
  
    return {
        deckIds:Object.keys(decks)
    }
}
export default connect(mapStateToProps)(DeckList)