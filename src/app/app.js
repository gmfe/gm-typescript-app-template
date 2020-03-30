import React, { Component } from 'react'

class App extends Component {
    handleClick = () => {
        console.log('Hello world')
    }

    render() {
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        return <p onClick={this.handleClick}>Hello world!</p>
    }
}

export default App
