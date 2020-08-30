import { StyleSheet, FlatList, FlatListProps, View } from "react-native";
import React from "react";
import { Title } from "react-native-paper";

export interface CarouselProps<ItemT = any> extends FlatListProps<ItemT> {
  title?: string;
}


/**
 * A carousel consists of a horizontal FlatList and a title
 *
 * @template ItemT
 * @param {CarouselProps<ItemT>} props
 * @return {*} 
 */
const Carousel = <ItemT extends Object>(props: CarouselProps<ItemT>) => {
  return (
    <View style={props.style}>
      <Title style={styles.title}>{props.title}</Title>
      <FlatList {...props} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginStart: 16,
    fontSize: 16,
    color: "gray",
  },
});

export default Carousel;
