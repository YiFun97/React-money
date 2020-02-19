import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
import App from './App';
import * as serviceWorker from './serviceWorker';

// axios.get('/items').then((response)=>{
//     console.log(response)
// })
// const newItem =
// {
//     "title": "弟弟一起喝酒",
//     "price": 300,
//     "date": "2018-09-20",
//     "monthCategory": "2018-9",
//     "id": "_jjficd985",
//     "cid": "3",
//     "timestamp": 1534723200000
// }
// axios.post('/items', newItem).then((response) => {
//     console.log(response)
// })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
