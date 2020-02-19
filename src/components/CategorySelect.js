import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { Colors } from '../utility'
// import { categoies } from '../containers/Home'

class CategorySelect extends React.Component {
        constructor(props) {
        super(props)
        this.state = {
            selectedCategoryId: props.selectedCategory && props.selectedCategory.id
        }
    }

    selectCategory = (event, category) => {
        this.setState({
            selectedCategoryId: category.id
        })
        this.props.onSelectCategory(category)
        event.preventDefault()
    }
    render() {
        const { categories } = this.props
        const {selectedCategoryId} = this.state 
        return (
            <div className="category-select-component">
                <div className="row">
                    {
                        categories.map((category, index) => {
                            const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
                            const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
                            const activeClassName = (selectedCategoryId === category.id)
                                ? 'category-item col-2 active' : 'category-item col-2'
                            return (
                                <div className={activeClassName} key={index} role="button" style={{ textAlign: 'center' }}
                                    onClick={(event) => { this.selectCategory(event, category) }}>
                                    <Ionicon
                                        className="rounded-circle"
                                        style={{ backgroundColor: backColor, padding: '5px' }}
                                        fontSize="50px"
                                        color={iconColor}
                                        icon={category.iconName}
                                    />
                                    <p>{category.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

CategorySelect.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.object,
    onSelectCategory: PropTypes.func.isRequired,
}
export default CategorySelect
// class CategorySelect extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             selectedCategoryId: props.selectedCategory && props.selectedCategory.id
//         }
//     }
//     selectCategory = (event, category) => {
//         this.setState({
//             selectedCategoryId: category.id
//         })
//         event.preventDefault()
//     }
//     render() {
//         const { categories } = this.props
//         const { selectedCategoryId } = this.state
//         return (
//             <div className="category-select-component">
//                 <div className="row">
//                     {

//                         categories.map((category, index) => {
//                             const activeClassName = (selectedCategoryId === category.id)
//                                 ? 'category-item col-3 active' : 'category-item col-3'
//                             return (

//                                 <div className={activeClassName} key={index}
//                                     onClick={(event) => { this.selectCategory(event, category) }}
//                                 >
//                                     <Ionicon
//                                         className="rounded-circle"
//                                         fontSize="35px"
//                                         color="#555"
//                                         icon={category.iconName}
//                                     />
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         )
//     }
// }

// CategorySelect.propTypes = {
//     categories: PropTypes.array.isRequired,
//     selectedCategory: PropTypes.object,
//     onSelectCategory: PropTypes.func.isRequired,
// }
// export default CategorySelect