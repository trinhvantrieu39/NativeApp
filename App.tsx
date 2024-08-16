import { Alert, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

interface iTodo{
  id: number,
  name: string
}

export default function App() {
 
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<iTodo[]>([]);

  function randomID(min: number, max: number){
      return Math.floor(Math.random() * (max-min+1) ) + min;
  }

  function handleList(){
    if(!todo) return ;
    setTodoList([...todoList,{id:randomID(1000, 9999), name:todo}])
    console.log(todo)
    setTodo("");
  }
  function deleteTodo(id: number){
    console.log("delete id: "+id)
    var temp = todoList.filter(item => item.id != id)
    setTodoList(temp)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>TODO</Text>

        <View>
          <TextInput style={styles.todoInpput} onChangeText={(value) => setTodo(value)}/>

          <Button title="add todo"
            onPress={handleList}
          />
        </View>

        {/* list todo */}
        <View>
          
          <FlatList
            
            data = {todoList}
            keyExtractor={item => item.id +""}
            renderItem={({item})=> {
              return (
                <Pressable
                  onPress={() => deleteTodo(item.id)}
                  style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}

                >

                  <Text style ={styles.todoItem}>{item.name}</Text>
                </Pressable>
                
              )
            }
            }
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    paddingTop: 50,
    
  },
  header:{
    backgroundColor: "gray",
    paddingHorizontal:20,
    textAlign: "center",
    fontSize: 40

  },
  todoInpput:{
    borderBottomWidth:1, 
    borderBlockColor: "green",
    padding: 5,
    marginHorizontal:20,
    margin: 15

  }, 
  todoItem:{
    fontSize: 20,
    borderWidth:1,
    borderStyle:"dashed",
    margin: 10,
    
  }

});
