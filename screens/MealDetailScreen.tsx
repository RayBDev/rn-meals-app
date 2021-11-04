import React, { useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

type Props = {
  navigation: NavigationStackProp;
};

const MealDetailScreen = ({ navigation }: Props) => {
  const availableMeals = useSelector((state: RootState) => state.meals.meals);
  const mealId = navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector((state: RootState) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    // navigation.setParams({mealTitle: selectedMeal?.title})
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal?.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal?.duration}m</DefaultText>
        <DefaultText>{selectedMeal?.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal?.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal?.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal?.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationStackProp;
}): NavigationStackOptions => {
  // const mealId = navigation.getParam('mealId');
  const mealTitle = navigation.getParam('mealTitle');
  const toggleFavorite = navigation.getParam('toggleFav');
  const isFavorite = navigation.getParam('isFav');
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});
