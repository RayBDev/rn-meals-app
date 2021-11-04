import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

const DefaultText = ({ children }: { children: ReactNode }) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
});
