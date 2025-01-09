import { ImageBackground, StyleSheet, Text } from 'react-native';
import { React } from 'react';

const backgroundImage = require("../assets/images/todoAppImage.png")

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  // const navigation = useNavigation();
  // 복장한 구조일 때 사용
  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage} >
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.container}>
          {/* <Text style={{ fontSize: 40, fontWeight: 'bold' }}>메인 화면</Text> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -35,
  },
  container: {
    flex: 1,
  },
});
