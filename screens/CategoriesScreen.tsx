import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackOptions,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  NavigationDrawerOptions,
  NavigationDrawerProp,
} from 'react-navigation-drawer';

import { CATEGORIES } from '../data/dummy-data';
import Category from '../models/category';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/HeaderButton';

const CategoriesScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const renderGridItem = (itemData: ListRenderItemInfo<Category>) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate('CategoryMeals', {
            categoryId: itemData.item.id,
          });
        }}
      />
    );
  };
  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationDrawerProp & NavigationStackProp;
}): NavigationDrawerOptions & NavigationStackOptions => {
  return {
    headerTitle: 'Meal Categories',
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

export default CategoriesScreen;
