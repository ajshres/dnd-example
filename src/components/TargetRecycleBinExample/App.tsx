import * as React from 'react';
import logo from '../../logo.svg';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Item from './Item';
import Target from './Target';

class App extends React.Component {
    state = {
        items: [
            {id:1, name:'Item1'},
            {id:2, name:'Item2'},
            {id:3, name:'Item3'},
            {id:4, name:'Item4'},
            {id:5, name:'Item5'},
            {id:6, name:'Item6'},
        ],
    }
    handleDrop = (item: any) => {
        let items:any = this.state.items;
        console.log('deleting:',item.id);
        const index = items.findIndex((ITEM: any) => ITEM.id===item.id);
        items.splice(index,1);
        this.setState({
            items
        });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} alt="Logo" className="App-logo"/>
                    <h1 className="App-title">Welcome To React</h1>
                </header>
                <div className="App-intro">
                    <div className="app-container">
                        <div className="item-container">
                            {this.state.items.map((item, index) => (
                                <Item key={item.id} item={item} handleDrop={this.handleDrop} />
                            ))}
                        </div>
                        <Target />
                    </div>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);