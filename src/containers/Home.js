import React, { Component, Children } from 'react';
import logo from '../logo.svg';
import { withRouter } from 'react-router-dom'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import { Tabs, Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import CustomPieChart from '../components/PieChart'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft, Colors } from '../utility'
import { AppContext } from '../App'
import withContext from '../WithContext'
import Loader from '../components/Loader'


const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
    let categoryMap = {}
    items.filter(item => item.category.type === type).forEach(item =>{
        if(categoryMap[item.cid]){
            categoryMap[item.cid].value += (item.price * 1)
            categoryMap[item.cid].items.push(item.id)
        } else {
            categoryMap[item.cid] = {
                name: item.category.name,
                value: item.price * 1,
                items: [item.id]
              }
        }
    })
    return Object.keys(categoryMap).map( mapKey =>  ({ ...categoryMap[mapKey] }) 
            )
}

const tabsText = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // currentDate: parseToYearAndMonth('2018-08'),
            tabView: tabsText[0],
        }
    }
    componentDidMount() {
        this.props.actions.getInitalData().then(items => {
            //会自动包裹成一个Pormise对象
            console.log('hehe', items)
        })
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
        const { data } = this.props
        const { items, categories, currentDate, isLoading } = data
        const { tabView } = this.state

        const itemsWithCategory = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid]
            return items[id]
        })
        const chartOutcomeDataByCatagory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
        const chartIncomeDataByCatagory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME)
        console.log(chartOutcomeDataByCatagory)
        let totalIncome = 0, totalOutcome = 0
        itemsWithCategory.forEach(item => {
            // console.log('item.category', item.category)
            if (item.category.type === TYPE_OUTCOME) {
                totalOutcome += item.price
            } else {
                totalIncome += item.price
            }
        })

        return (

            <React.Fragment>
                <header className="App-header">
                    <div className="row  justify-content-center">
                        <h3>Fan记账</h3>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <MonthPicker
                                year={currentDate.year}
                                month={currentDate.month}
                                onChange={this.changeDate}
                            />
                        </div>
                        <div className="col-4 ">
                            <TotalPrice income={totalIncome} outcome={totalOutcome} />
                        </div>
                    </div>
                </header>
                <div className="content-area py-3 px-3">
                    {isLoading &&
                        <Loader />
                    }
                    {!isLoading &&
                        <React.Fragment>
                            <Tabs activeIndex={0} onTabChange={this.changeView}>
                                <Tab>
                                    <Ionicon className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color={'rgb(100,88,245)'}
                                        icon='ios-paper'
                                    />
                                                   列表模式
                                          </Tab>
                                <Tab>
                                    <Ionicon className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color={'rgb(100,88,245)'}
                                        icon='ios-pie'
                                    />
                                                     图表模式
                                           </Tab>
                            </Tabs>
                          
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
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-6">
                                <CustomPieChart title="本月支出" categoryData={chartOutcomeDataByCatagory} />
                                </div>
                                <div className="col-6">
                                <CustomPieChart title="本月收入" categoryData={chartIncomeDataByCatagory} />
                                </div>
                                </div>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>

        )
    }
}
export default withRouter(withContext(Home))

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