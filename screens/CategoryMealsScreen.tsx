import React from 'react';
import { useSelector } from 'react-redux';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import { StyleSheet, View } from 'react-native';
import MealList from '../components/MealList';

import { CATEGORIES } from '../data/dummy-data';
import { RootState } from '../App';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}) => {
  const catId = navigation.getParam('categoryId');

  const availableMeals = useSelector(
    (state: RootState) => state.meals.filteredMeals
  );

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={navigation} />;
};

CategoryMealsScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}): NavigationStackOptions => {
  const catId = navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  if (selectedCategory) {
    return {
      headerTitle: selectedCategory.title,
    };
  } else {
    return {};
  }
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
