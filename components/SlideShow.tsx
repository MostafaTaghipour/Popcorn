import { FlatList, FlatListProps, View } from "react-native";
import React from "react";

export interface SlideShowProps<ItemT = any> extends FlatListProps<ItemT> {
  title?: string;
}

/**
 * A SlideShow is a horizontal FlatList with pagingEnabled
 *
 * @template ItemT
 * @param {SlideShowProps<ItemT>} props
 * @return {*} 
 */
const SlideShow = <ItemT extends Object>(props: SlideShowProps<ItemT>) => {
  return (
    <View style={props.style}>
      <FlatList
        {...props}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};


export default SlideShow;
