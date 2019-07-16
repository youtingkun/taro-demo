import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input,Map } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, del } from '../../actions/index'
import Clock from '../../components/clock/clock'
import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props){
    super(props)
    this.state = {
      list:[
        'get up',
        'coding',
        'sleep'
      ],
      inputVal:'',
      newTodo:'',
      date:new Date()
    }
  }

  addItem () {
    let { list } = this.state
    const inputVal = this.inputVal
    if(inputVal == '') return
    else {
      list.push(inputVal)
      
    }
    this.setState({
      list,
      inputVal:''
    })
  }

  delItem (index) {
    let { list } = this.state
    list.splice(index,1)
    this.setState(
      list
    )
  }

  inputHandler (e) {
    this.inputVal = e.target.value
    

    
  }

  saveNewTodo (e) {
    let { newTodo } = this.state
    if(!e.detail.value || e.detail.value === newTodo) return
    this.setState({
      newTodo:e.detail.value
    })

  }

  addTodo () {
    let { newTodo } = this.state
    let { add } = this.props
    if(!newTodo) return
    add(newTodo)
    this.setState({
      newTodo:''
    })
  }

  delTodo(id){
    let { del } = this.props
    del(id)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  

  render () {
    let {list,inputVal,newTodo} = this.state
    let { todos,add,del } = this.props

    const todosJsx = todos.map(todo => {
      return(
        <View className='todos_item'>
          <Text>{todo.text}</Text>
          <View className='del' onClick={this.delTodo.bind(this,todo.id)}>-</View>
        </View>
      )
    })

    return (
      
      <View className='index'>
      <Map></Map>
      <View>TodoList应用:
        <Input className='input' type='text' value={inputVal} onInput={this.inputHandler.bind(this)}></Input>
        <Text className='add' onClick={this.addItem.bind(this)}>+</Text>
        <View className='list_warp'>
          {
            list.map((item,index) => {
              return <View> 
                <Text>{index+1}.{item}</Text>
                <Text className='del' onClick={this.delItem.bind(this,index)}>-</Text>
              </View>
            })
          }
        </View>
        </View>

        <View>使用Redux:
        <View>
          <Input placeholder='填写新的todo'className='input'  onBlur={this.saveNewTodo.bind(this)} value={newTodo}></Input>
          <Text className='add' onClick={this.addTodo.bind(this)}>+</Text>
          </View>
          <View>{todosJsx}</View>
        </View>

        <View>计时器组件Clock:
        <View><Text>现在时间是{this.state.date.toLocaleTimeString()}</Text></View>
        <Clock></Clock>
        </View>

      </View>
      
    )
  }
}

export default connect (({todos}) => ({
  todos:todos.todos
}),(dispatch) => ({
  add(data){
    dispatch(add(data))
  },
  del (id){
    dispatch(del(id))
  }
}))(Index)


