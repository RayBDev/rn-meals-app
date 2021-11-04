import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../App';

import MealItem from '../components/MealItem';
import Meal from '../models/meal';

type Props = {
  listData: Meal[];
  navigation: NavigationStackProp;
};

const MealList = ({ listData, navigation }: Props) => {
  const favoriteMeals = useSelector(
    (state: RootState) => state.meals.favoriteMeals
  );

  const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
    const isFavorite = favoriteMeals.some(
      (meal) => meal.id === itemData.item.id
    );

    return (
      <MealItem
        title={itemData.item.title}
        onSelectMeal={() => {
          navigation.navigate('MealDetail', {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavorite,
          });
        }}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imageUrl={itemData.item.imageUrl}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
