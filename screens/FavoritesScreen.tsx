import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackOptions,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  NavigationDrawerOptions,
  NavigationDrawerProp,
} from 'react-navigation-drawer';

import MealList from '../components/MealList';
import CustomHeaderButton from '../components/HeaderButton';
import { RootState } from '../App';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const favMeals = useSelector((state: RootState) => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals Found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationDrawerProp & NavigationStackProp;
}): NavigationDrawerOptions & NavigationStackOptions => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
