import React from 'react'
import ReactDOM from 'react-dom'
import Table from './components/Table'
import Contributing from './components/Contributing'

const elements = document.getElementsByClassName('App');

for (let i = 0; i <= elements.length; i++) {
    switch (elements[i].id) {
        case 'Table':
            ReactDOM.render((<Table />),
                document.getElementById('Table'));
            break
        case 'Contributing':
            ReactDOM.render((<Contributing />),
                document.getElementById('Contributing'));
            break
        default:
            break
    }
}