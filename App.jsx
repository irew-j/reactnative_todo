import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Dimensions } from 'react-native';
import tabConfig from './configs/tabConfig';
import { TodoPrvider } from './components/TodoPrvider'
import { Text } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';


// 윈도우의 너비와 높이를 가져옵니다.
const { width, height } = Dimensions.get('window');

// 커스텀 폰트를 적용한 Text 컴포넌트
const TextWithFont = (props) => <Text style={[styles.textStyle, props.style]} {...props} />;

const CustomHeader = ({ title }) => {
  return (
    <>
      {/* 노치 부분을 피하기 위해 SafeAreaView를 사용합니다 */}
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" animated={true} />
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    // SplashScreen.hide()를 호출하기 전에 SplashScreen이 존재하는지 확인
    if (SplashScreen) {
      setTimeout(() => {
        SplashScreen.hide();  // 네이티브 코드에서 스플래시 화면 숨기기
      }, 3000); // 스플래시 화면을 1초 후에 숨깁니다.
    } else {
      console.log('SplashScreen 모듈이 준비되지 않았습니다.');
    }
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번만 실행되도록 설정


  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find(config => config.name === route.name);
      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: {
      elevation: 20, // android
      shadowColor: '#000', // ios
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    // `tabBarLabel`을 커스터마이즈하여 `TextWithFont`를 적용합니다.
    tabBarLabel: ({ focused, color }) => {
      const routeConfig = tabConfig.find(config => config.name === route.name);
      return (
        <TextWithFont
          style={{
            fontSize: 12,
            paddingBottom: 10,
            fontWeight: 'bold',
            fontFamily: 'GmarketSansTTFMedium',
            color: focused ? 'black' : '#0163d2', // focus 상태에 따라 색상 변경
          }}
        >
          {routeConfig.title}
        </TextWithFont>
      );
    },
    tabBarStyle: {
      height: "8%", // 시뮬레이션에서는 %로 설정하여 해상도에 맞게 대응
    },
    tabBarInactiveTintColor: '#0163d2', // 비활성화 색상
    tabBarActiveTintColor: 'black', // 활성화 색상
  });

  return (
    <TodoPrvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          {tabConfig.map(routeConfig => (
            <Tab.Screen
              key={routeConfig.name}
              name={routeConfig.name}
              component={routeConfig.component}
              options={{
                title: routeConfig.title,
                header: () => <CustomHeader title={routeConfig.title} />
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </TodoPrvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBox: {
    height: height * 0.05,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'GmarketSansTTFMedium', // 기본 폰트를 지정합니다.
  },
});

export default App;
