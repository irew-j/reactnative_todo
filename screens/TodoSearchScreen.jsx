import {Text} from 'react-native';
import {React} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
const TodoSearchScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>할일 검색</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TodoSearchScreen;
