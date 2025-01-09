import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Alert, Modal, TextInput, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodosContext from '../components/TodoPrvider';
import { ListItem, Icon } from '@rneui/themed';

const { width, height } = Dimensions.get('window');


const TodoListItem = ({ todo, onModify, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <View
      style={{
        marginVertical: 5,  // y 축
        marginHorizontal: 10, // x 축
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden'
      }}>
      <ListItem.Swipeable
        bottomDivider
        style={styles.listBox}
        leftContent={(reset) => (
          <Pressable style={{ ...styles.pressableBtn, backgroundColor: 'blue' }}
            onPress={() => onModify(todo, reset)}
          >
            <Icon name='archive' type='entypo' color="white" />
            <Text style={styles.btnText}>수정</Text>
          </Pressable>
        )}
        rightContent={(reset) => (
          <Pressable style={{ ...styles.pressableBtn, backgroundColor: 'red' }}
            onPress={() => onRemove(todo.id, reset)}
          >
            <Icon name='cup' type="entypo" color="white" />
            <Text style={styles.btnText}>삭제</Text>
          </Pressable>
        )}
      >
        <ListItem.Content>
          <ListItem.Title>번호 : {todo.id}</ListItem.Title>
          <Text>작성날짜 : {todo.regDate}</Text>
          <Pressable onPress={toggleExpand} style={styles.contentBox}>
            <Text numberOfLines={isExpanded ? null : 2} ellipsizeMode='tail'>할 일 : {todo.content}</Text>
          </Pressable>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  )
}

const TodoModifyModal = ({ modalVisible, setModalVisible, onModify, closeModal, modifydContent, setmodifydContent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <Pressable onPress={closeModal} style={styles.modalContainer}>
        <Pressable style={styles.modalBox}>
          <ScrollView style={styles.modalInner}>
            <View>
              <TextInput style={styles.modifyInput} placeholder='수정할 일을 입력해주세요'
                multiline
                maxLength={100}
                value={modifydContent}
                onChangeText={setmodifydContent}
              />
            </View>
          </ScrollView>
          <View style={styles.modalBtnBox}>
            <TouchableOpacity onPress={onModify}>
              <Text style={styles.modalBtnText}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalBtnText}>취소</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const TodoListScreen = () => {
  const { todos, removeTodo, modifyTodo } = useContext(TodosContext); // todos를 구조 분해하여 가져오기
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodosId, setSelectedTodosId] = useState(null);
  const [modifydContent, setmodifydContent] = useState('');

  const openModifyModal = (todo, reset) => {
    setSelectedTodosId(todo.id);
    setmodifydContent(todo.content);
    reset();
    setModalVisible(true);
  }
  const handleModifyTodo = () => {
    if (selectedTodosId !== null) {
      modifyTodo(selectedTodosId, modifydContent);

      setSelectedTodosId(null);
      setModalVisible(false);
    }

  }

  const closeModal = () => {
    setmodifydContent(modifydContent);
    // reset();
    setModalVisible(false);
  }

  const handleRemoveTodo = (id, reset) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      {
        text: '삭제',
        onPress: () => {
          removeTodo(id);
          reset();
        },
        style: 'destructive'

      },
      { text: '취소', onPress: () => reset(), style: 'cancel' },
    ],
      {
        cancelable: true, // 경고창 밖 아무 곳 이나 터치하면 경고창이 닫힘 ios 작동x
        onDismiss: () => reset(), // cancelable후 콜백 함수 실행
      }
    );
  }
  return (
    <SafeAreaView
      style={styles.todoListContainer}>
      {todos && todos.length > 0 ? (
        // 스크롤 기능을 구현
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoListItem
              todo={item}
              onModify={openModifyModal}
              onRemove={handleRemoveTodo}
            />
          )}
          keyExtractor={item => item.id.toString()} // 고유의 key를 관리한다. 문자열 키를 사용해야한다.
        />
      ) :
        (
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>할 일이 없습니다</Text>
        )}
      <TodoModifyModal modalVisible={modalVisible} setModalVisible={setModalVisible} onModify={handleModifyTodo} closeModal={closeModal} modifydContent={modifydContent} setmodifydContent={setmodifydContent} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  pressableBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    flex: 0.3,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
  },
  modalInner: {},
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },
  modalBtnBox: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: 'bold',

  }
});

export default TodoListScreen;
