import React, { Component, Children } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../logo.svg';
import {withRouter} from 'react-router-dom'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import { Tabs, Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility'
import { AppContext } from '../App'
import withContext  from '../WithContext'


const tabsText = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // currentDate: parseToYearAndMonth('2018-08'),
            tabView: tabsText[0],
        }
    }
    componentDidMount(){
        this.props.actions.getInitalData()
    }
    changeView = (index) => {
        this.setState({
            tabView: tabsText[index]
        })
    }
    changeDate = (year, month) => {
        this.props.actions.selectNewMonth(year, month)
    }
    modifyItem = (item) => {
        this.props.history.push(`/edit/${item.id}`)
    }
    createItem = () => {
        this.props.history.push('/create')
    }
    deteleItem = (item) => {
        this.props.actions.deleteItem(item)
    }
    render() {
        const {data} = this.props
        const {items, categories, currentDate} = data
        const { tabView } = this.state
        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid]
            return items[id]
        })
        let totalIncome = 0, totalOutcome = 0
        itemsWithCategory.forEach(item => {
            if (item.category.type === TYPE_INCOME) {
                totalIncome += item.price
            } else {
                totalOutcome += item.price
            }
        })

        return (
           
                            <React.Fragment>
                                <header className="App-header">
                                    <div className="row mb-5 justify-content-center">
                                        <img src={logo} className="App-logo" alt="logo" />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <MonthPicker
                                                year={currentDate.year}
                                                month={currentDate.month}
                                                onChange={this.changeDate}
                                            />
                                        </div>
                                        <div className="col">
                                            <TotalPrice income={totalIncome} outcome={totalOutcome} />
                                        </div>
                                    </div>
                                </header>
                                <div className="content-area py-3 px-3">
                                    <Tabs activeIndex={0} onTabChange={this.changeView}>
                                             <Tab>
                                            <Ionicon className="rounded-circle mr-2"
                                                fontSize="25px"
                                                color={'#007bff'}
                                                icon='ios-paper'
                                            />
                                                   列表模式
                                          </Tab>
                                          <Tab>
                                            <Ionicon className="rounded-circle mr-2"
                                                fontSize="25px"
                                                color={'#007bff'}
                                                icon='ios-pie'
                                            />
                                                     图表模式
                                           </Tab>
                                    </Tabs>
                                    {/* <ViewTab
                        activeTab={tabView}
                        onTabChange={this.changeView}
                    /> */}
                                    <CreateBtn onClick={this.createItem} />

                                    {tabView === LIST_VIEW &&
                                        <PriceList
                                            items={itemsWithCategory}
                                            onModifyItem={this.modifyItem}
                                            onDeleteItem={this.deteleItem}
                                        />
                                    }
                                    {
                                        tabView === CHART_VIEW &&
                                        <h1>图表区域</h1>
                                    }
                                </div>
                            </React.Fragment>
               
        )
    }
}
export default  withRouter(withContext(Home))

// export const categoies = {
//     "1": {
//         "id": 1,
//         "name": "旅行",
//         "type": "outcome",
//         "iconName": "ios-plane"
//     },
//     "2": {
//         "id": 2,
//         "name": "学习",
//         "type": "income",
//         "iconName": "ios-book"
//     }
// }
// export const items = [
//     {
//         "id": 1,
//         "title": "去旅游",
//         "price": 200,
//         "date": "2018-09-10",
//         "cid": 1
//     },
//     {
//         "id": 2,
//         "title": "买书",
//         "price": 50,
//         "date": "2018-10-10",
//         "cid": 2
//     },
//     {
//         "id": 3,
//         "title": "理财收入",
//         "price": 150,
//         "date": "2018-10-10",
//         "cid": 1
//     }
// ]
// export const newItem = {
//     "id": 4,
//     "title": "新增加",
//     "price": 100,
//     "date": "2018-10-10",
//     "cid": 1
// }