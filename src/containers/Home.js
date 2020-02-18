import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../logo.svg';
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import { Tabs, Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility'

export const categoies = {
    "1": {
        "id": 1,
        "name": "旅行",
        "type": "outcome",
        "iconName": "ios-plane"
    },
    "2": {
        "id": 2,
        "name": "学习",
        "type": "income",
        "iconName": "ios-book"
    }
}
export const items = [
    {
        "id": 1,
        "title": "去旅游",
        "price": 200,
        "date": "2018-09-10",
        "cid": 1
    },
    {
        "id": 2,
        "title": "买书",
        "price": 50,
        "date": "2018-10-10",
        "cid": 2
    },
    {
        "id": 3,
        "title": "理财收入",
        "price": 150,
        "date": "2018-10-10",
        "cid": 1
    }
]
export const newItem = {
    "id": 4,
    "title": "新增加",
    "price": 100,
    "date": "2018-10-10",
    "cid": 1
}
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW,
        }
    }

    changeView = (view) => {
        this.setState({
            tabView: view
        })
    }
    changeDate = (year, month) => {
        this.setState({
            currentDate: { year, month }
        })

    }
    modifyItem = (modifiedItem) => {
        const modifiedItems = this.state.items.map(item => {
            if (item.id === modifiedItem.id) {
                return { ...item, title: '更新后的标题' }
            } else {
                return item
            }
        })
        this.setState({
            items: modifiedItems
        })
    }
    createItem = () => {
        this.setState({
            items: [newItem, ...this.state.items]
        })
    }
    deteleItem = (deteledItem) => {
        const filteredItems = this.state.items.filter(item => item.id !== deteledItem.id)
        this.setState({
            items: filteredItems
        })
    }
    render() {
        const { items, tabView, currentDate } = this.state
        const itemsWithCategory = items.map(item => {
            item.category = categoies[item.cid]
            return item
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
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
                    <Tabs activeIndex={0} onTabChange={() => { }}>
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
                    <ViewTab
                        activeTab={tabView}
                        onTabChange={this.changeView}
                    />
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
export default Home