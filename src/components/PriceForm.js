import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isValidDate } from '../utility'

class PriceForm extends Component {
    static propTypes = {
        onFormSubmit: PropTypes.func.isRequired,
        onCancelSubmit: PropTypes.func.isRequired,
        item: PropTypes.object,
    }
    static defaultProps = {
        item: {}
    }
    state = {
        validatePass: true,
        errorMessage: '',
    }
    submitForm = (event) => {
        const { item, onFormSubmit } = this.props
        const editMode = !!item.id
        const price = this.priceInput.value.trim() * 1
        const title = this.titleInput.value.trim()
        const date = this.dateInput.value.trim()
        if (price && title && date) {
            if (price < 0) {
                this.setState({
                    validatePass: false,
                    errorMessage: '价格数字必须大于0'
                })
            }
            else if (!isValidDate(date)) {
                this.setState({
                    validatePass: false,
                    errorMessage: '请填写正确的日期格式'
                })
            } else {
                this.setState({
                    validatePass: true,
                    errorMessage: ''
                })
                if (editMode) {
                    onFormSubmit({ ...item, price, title, date }, editMode)
                } else {
                    onFormSubmit({ title, price, date }, editMode)
                }
            }
        } else{
            this.setState({
                validatePass: false,
                errorMessage: '请输入所有必选项'
              })
        }
        event.preventDefault()
    }
    render() {
        const { title, price, date } = this.props.item
        return (
            <form onSubmit={(event) => { this.submitForm(event) }} noValidate>
                <div className="form-group row">
                    <label className="col-sm-1" >标题：</label>
                    <div className="col-sm-6">
                        <input
                            type="text" className="form-control"
                            id="title" placeholder="请输入标题"
                            defaultValue={title}
                            ref={(input) => { this.titleInput = input }}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1" >价格：</label>
                    <div className="col-sm-6">
                        <input
                            type="number" className="form-control"
                            defaultValue={price}
                            id="price" placeholder="请输入价格"
                            ref={(input) => { this.priceInput = input }}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="date" className="col-sm-1">日期：</label>
                    <div className="col-sm-6">
                        <input
                            type="date" className="form-control"
                            id="date" placeholder="请输入日期"
                            defaultValue={date}
                            ref={(input) => { this.dateInput = input }}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mr-3">提交</button>
                <button className="btn btn-secondary" onClick={this.props.onCancelSubmit}>取消</button>
                {
                    !this.state.validatePass &&
                    <div className="alert alert-danger mt-5" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
            </form>
        )
    }
}

export default PriceForm