import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { FlatGrid } from "react-native-super-grid";

const StoreList = props => {
  return (
    <FlatGrid
      itemDimension={120}
      items={props.items}
      style={styles.gridView}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            Actions.push("menu", { store_id: item.id, store: item.name })
          }
        >
          <View style={[styles.itemContainer]}>
            <Image
              style={{ width: "90%", height: "90%" }}
              source={{ uri: item.image }}
              resizeMode={"center"}
            />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    backgroundColor: "#fff"
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
    alignItems: "center"
  },
  itemName: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    justifyContent: "center",
    fontStyle: "normal",
    letterSpacing: 0,
    alignItems: "center"
  }
});

StoreList.propTypes = {
  items: PropTypes.array
};

export default StoreList;
