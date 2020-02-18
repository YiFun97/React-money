import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import MonthPicker from '../MonthPicker'

let props = {
    year: 2018,
    month: 8,
    onChange: jest.fn()
}
let wrapper

describe('测试月份组件', () => {
    //把wrapper先渲染出来
    beforeEach(() => {
        wrapper = mount(<MonthPicker {...props} />)
    })
    it('增加snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('渲染正确年份月份,正确的下拉框', () => {
        const text = wrapper.find('.dropdown-toggle').first().text()
        expect(text).toEqual('2018年 08月')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isOpen')).toEqual(false)
        expect(wrapper.state('selectedYear')).toEqual(props.year)
    })
    it('点击日期框后是否出现正确年月份', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.years-range .dropdown-item.active').text())
        .toEqual('2018 年')
        expect(wrapper.find('.months-range .dropdown-item.active').text())
        .toEqual('08 月')
        // the first year should be the current year minus 4
        expect(wrapper.find('.years-range .dropdown-item').first().text())
        .toEqual(`${props.year - 4} 年`)
        expect(wrapper.find('.months-range .dropdown-item').first().text())
        .toEqual('01 月')
    })
})