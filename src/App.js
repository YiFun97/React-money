import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './containers/Home'
import Create from './containers/Create'
// import { testCategories, testItems } from './testData'
import { flatternArr, ID, parseToYearAndMonth} from './utility'

export const AppContext = React.createContext()
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth('2018-09'),
    }
    this.actions = {
      getInitalData:()=>{
        const {currentDate} = this.state 
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const promiseArr = [axios.get('/categories'),axios.get(getURLWithData)]
        Promise.all(promiseArr).then(arr =>{
          const [categories, items]  = arr
          this.setState({
            items: flatternArr(items.data),
            categories: flatternArr(categories.data)
          })
        })
      },
      selectNewMonth:(year, month)=>{
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        axios.get(getURLWithData).then(items =>{
          this.setState({
            items: flatternArr(items.data),
            currentDate: {year, month}
          })
        })
      },
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items:this.state.items
        })
      },
      createItem: (data, categoryId) =>{
        console.log('haha', data)
        console.log('cid', categoryId)
        const newId = ID()
        const parsedDate =parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid:categoryId}
        this.setState({
          items:{...this.state.items, [newId]:newItem}
        })
      },
      updateItem:(item, updatedCategoryId) => {
        const modifedItem = {
          ...item, 
          cid:updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        this.setState({
          items: {...this.state.items, [modifedItem.id]:modifedItem }
        }) 
      }
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions,
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" exact component={Create} />
              <Route path="/edit/:id" exact component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )

  }
}

export default App;
