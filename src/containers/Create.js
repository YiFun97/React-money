import React from 'react'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'

const Create = ({match}) => {
    const categories = [
        {
         "id": "1",
         "name": "旅行",
         "type": "outcome",
         "iconName": "ios-plane",    
       },
        {
         "id": "2",
         "name": "理财",
         "type": "income",
         "iconName": "logo-yen", 
       },
       {
         "id": "3",
         "name": "理财",
         "type": "income",
         "iconName": "logo-yen", 
       }
     ]
return (
    <div>
        <h1>this.is creat {match.params.id}</h1>
        {/* <CategorySelect categories={categories} /> */}
        <PriceForm   />
    </div>
    
)
}
export default Create