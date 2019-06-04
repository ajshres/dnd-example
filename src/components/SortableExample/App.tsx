import * as React from 'react';
import logo from '../../logo.svg';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Card from './Card';
import update from 'immutability-helper';

class App extends React.Component {
    state = {
        cards: [
            {id:1, text:'Write a cool JS library'},
            {id:2, text:'Make it generic enough'},
            {id:3, text:'Write Readme'},
            {id:4, text:'Create some examples'},
            {id:5, text:'Spam in twitter and IRC to promote it (note that this element is taller than others)'},
            {id:6, text:'???'},
            {id:7, text:'PROFIT'},
        ],
    }
    handleDrop = (item: any) => {
        let cards:any = this.state.cards;
        console.log('deleting:',item.id);
        const index = cards.findIndex((ITEM: any) => ITEM.id===item.id);
        cards.splice(index,1);
        this.setState({
            cards
        });
    }
    moveCard = (dragIndex: number, hoverIndex: number) => {
        const { cards } = this.state
		const dragCard = cards[dragIndex]

		this.setState(
			update(this.state as any, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			} as any),
		)
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} alt="Logo" className="App-logo"/>
                    <h1 className="App-title">Welcome To React</h1>
                </header>
                <div className="App-intro">
                    <div className="card-container">
                        {this.state.cards.map((card,index) => (
                            <Card
                                key={card.id}
                                index={index}
                                id={card.id}
                                text={card.text}
                                moveCard={this.moveCard}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);