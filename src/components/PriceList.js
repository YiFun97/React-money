import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
    return (
        <ul className="list-group list-grop-flush">
            {
                items.map((item) => (
                    <li className="list-group-item row  d-flex
                        justify-content-between align-items-center"
                        key={item.id}
                    >
                        <span className="col-1 " >
                            <Ionicon className="rounded-circle"
                                fontSize="35px"
                                color={'#788895'}
                                icon={item.category.iconName}
                            />
                        </span>
                        <span className="col-5">{item.title}</span>
                     
                        <span className="col-2 font-weight-bold">
                            {(item.category.type === 'income') ? '+' : '-'}
                            {item.price}元
                        </span>
                        <span className="col-2">{item.date}</span>
                       
                        <div className="col-1">
                            <a
                                role="button"
                                onClick={(event) => { event.preventDefault(); onModifyItem(item) }}
                            >
                                <Ionicon className="rounded-circle"
                                    fontSize="30px"
                                    color={'#788895'}
                                    icon='ios-create-outline'
                                />
                            </a>
                        </div>
                        <div className="col-1">
                            <a
                                role="button"
                                onClick={(event) => { event.preventDefault(); onDeleteItem(item) }}
                            >
                                <Ionicon className="rounded-circle"
                                    fontSize="40px"
                                    color={'#788895'}
                                    icon='ios-close'
                                />
                            </a>
                        </div>
                    
                    </li>
                ))
            }
        </ul>
    )
}
PriceList.propTypes = {
    items: PropTypes.array.isRequired,
    onModifyItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
}
PriceList.defaultProps = {
    onModifyItem: () => { }
}
export default PriceList