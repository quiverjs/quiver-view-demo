import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { renderApp } from './app'
import { spvaToReactElement } from 'quiver-view'

const spva = renderApp()
const reactElement = spvaToReactElement(spva)

ReactDOM.render(
  reactElement,
  document.getElementById('main')
)
