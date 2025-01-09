import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/HomeScreen';
import TodoSearchScreen from '../screens/TodoSearchScreen';
import TodoWriteScreen from '../screens/TodoWriteScreen';
import TodoListScreen from '../screens/TodoListScreen';
import MyPageScreen from '../screens/MyPageScreen';

const tabConfig = [
  {
    name: 'Home',
    title: '메인 홈',
    component: HomeScreen,
    focusedIcon: 'home',
    unfocusedIcon: 'home',
    iconComponent: Entypo,
  },
  {
    name: 'TodoSearch',
    title: '할일 검색',
    component: TodoSearchScreen,
    focusedIcon: 'direction',
    unfocusedIcon: 'direction',
    iconComponent: Entypo,
  },
  {
    name: 'TodoWrite',
    title: '할일 작성',
    component: TodoWriteScreen,
    focusedIcon: 'edit', // 수정 전: 'note-edit'
    unfocusedIcon: 'edit', // 수정 전: 'note-edit-outline'
    iconComponent: Entypo,
  },
  {
    name: 'TodoList',
    title: '할일 리스트',
    component: TodoListScreen,
    focusedIcon: 'list',
    unfocusedIcon: 'add-to-list',
    iconComponent: Entypo,
  },
  {
    name: 'MyPage',
    title: '내 정보',
    component: MyPageScreen,
    focusedIcon: 'user',
    unfocusedIcon: 'user',
    iconComponent: Entypo,
  },
];

export default tabConfig;
