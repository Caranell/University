import React from 'react'
import ReactDOM from 'react-dom'
import CarsTable from './components/CarsTable'
import Contributing from './components/Contributing'

const elements = document.getElementsByClassName('App');
// const page = document.getElementById('CarsTable').innerHTML;
for (const element of elements) {
	switch (element.id) {
			case 'CarsTable':
					ReactDOM.render((<CarsTable />),
							document.getElementById('CarsTable'));
					break
			case 'Contributing':
					ReactDOM.render((<Contributing />),
							document.getElementById('Contributing'));
					break
			default:
					break
	}
}