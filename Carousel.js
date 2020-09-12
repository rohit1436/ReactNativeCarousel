import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Card = (props) => {
  return (
    <View style={{ ...styles.mainCardView, backgroundColor: props.colo }}>
      <Text style={{ ...styles.textView }}>{props.name}</Text>
    </View>
  );
};

class Carousel extends React.Component {
 // flatlistRef = React.createRef();
  constructor() {
    super();
    this.flatlistRef =React.createRef()
    this.state = {
      cardData: [
        { key: 1, name: 'Rohit', color: '#962353' },
        { key: 2, name: 'Sai', color: '#962738' },
        { key: 3, name: 'Samial', color: '#423353' },
        { key: 4, name: 'Anjun', color: '#954253' },
        { key: 5, name: 'Veera', color: '#964753' },
      ],
      selctedIndex: 0,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(prev=>({
        selctedIndex:
        prev.selctedIndex === this.state.cardData.length - 1 ? 0 : prev.selctedIndex + 1
      }),()=>{
        console.log(this.state.selctedIndex)
        this.flatlistRef.current.scrollToIndex({
        animated:true,
        index:this.state.selctedIndex,
        viewPosition:this.state.selctedIndex
      })
      })
      
    },3000);
  };

  render() {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    if (this.state.cardData && this.state.cardData.length) {
      return (
        <View style={styles.mainContainer} >
          <Animated.FlatList
            ref={this.flatlistRef}
            data={this.state.cardData}
            keyExtractor={(item, index) => 'key' + index}
            pagingEnabled
            scrollEnabled
            snapToAlignment="center"
            horizontal
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return <Card name={item.name} colo={item.color} />;
            }}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: scrollX } } },
            ],{useNativeDriver:true})}
          />
          <View style={styles.dotView}>
            {this.state.cardData.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: 10,
                    width: 10,
                    backgroundColor: '#595959',
                    margin: 8,
                    borderRadius: 5,
                  }}></Animated.View>
              );
            })}
          </View>
        </View>
      );
    } else {
      null;
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCardView: {
    display: 'flex',
    width: width - 20,
    height: height / 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 4,
  },
  textView: {
    textAlign: 'center',
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default App;
