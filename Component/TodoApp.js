import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, FlatList, Alert } from "react-native";

const TodoApp = () => {
          const [value, setValue] = useState()
          const [item, setItem] = useState([])
          const [updateBtn, isUpdate] = useState(false)          

const handleAdd = () => {

        if(!value) {
          Alert.alert('please enter the todo..')
        } else{

          // console.log('value ', value)
          let obj = {title: '', id: ''}
          let newId = new Date().getMilliseconds()
          obj = {
            title: value,
            id: newId
          }
          // console.log(obj)
          setItem([...item, obj])
          setValue('')
        }
    }

const handleDelete = (data) => {
          // console.log(item)
          let newArr = item.filter(obj => data.id !== obj.id)
          setItem(newArr)
}

const handleEdit = (data) => {
  // console.log(data)
  setValue(data.title)
  handleDelete(data)
  isUpdate(true)
}

const handleUpdate = () => {
  handleAdd()
  isUpdate(false)
}
          return ( 
            <View>

                              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>        

                              <TextInput
                              keyboardType='default'
                              placeholder = 'ENTER TODO...'
                              style={styles.input}
                              value={value}
                              onChangeText={(e) => setValue(e)} />
                                      </TouchableWithoutFeedback>


{       !updateBtn ?                               (<TouchableOpacity style={{marginLeft: 'auto',marginRight: 'auto', marginTop: '3%'}} onPress={handleAdd}>
                                                  <Text style={styles.btn}> ADD </Text>
                                        </TouchableOpacity>
  ):(
                                        <TouchableOpacity style={{marginLeft: 'auto',marginRight: 'auto', marginTop: '3%'}} onPress={handleUpdate}>
                                                  <Text style={styles.btn}> UPDATE </Text>
                                        </TouchableOpacity>
)}                              
        <FlatList 
        data={item}
        renderItem={( { item } ) => <TouchableOpacity
        key = {item.id}
        onPress = {() => handleDelete(item)}>
        <Text style = {styles.list}> {item.title}</Text>
        <TouchableOpacity
        key={item.id}
        onPress = {() => handleEdit(item)}>
          <Text style={{color: 'darkblue', fontSize: 20}}> EDIT </Text>
        </TouchableOpacity>
          </TouchableOpacity> }
                      />

        </View>

           );
}
 
const styles = StyleSheet.create({
          input: {
                    marginTop: 70,
                    color: 'red',
                    fontSize: 30,
                    width: 350,
                    height: '10%',
                    borderBottomWidth : 2,
                    borderColor : 'grey'
          },
          btn: {
                    color: 'red',
                    width: 100,
                    fontSize: 25,
                    // marginHorizontal: 'auto' 
          },
          list: {
                    color: 'blue',
                    fontSize: 30,
                    backgroundColor: '#fff'
          }
})
export default TodoApp;