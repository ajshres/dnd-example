import * as React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import Card from '../SortableExample/Card';

class App extends React.Component<any,any> {
    container: any = null;
    container2: any = null;
    constructor(props: any) {
        super(props);
        this.state = {
            container1: [
                {
                    id: 1,
                    text: 'Draggable1'
                },
                {
                    id: 2,
                    text: 'Draggable2'
                },
                {
                    id: 3,
                    text: 'Draggable3'
                },
                {
                    id: 4,
                    text: 'Draggable4'
                },
            ],
            container2: [
                {
                    id: 5,
                    text: 'Draggable5'
                },
                {
                    id: 6,
                    text: 'Draggable6'
                },
                {
                    id: 7,
                    text: 'Draggable7'
                },
                {
                    id: 8,
                    text: 'Draggable8'
                },
            ],
            container3: [
                {
                    id: 9,
                    text: 'Draggable9'
                },
                {
                    id: 10,
                    text: 'Draggable10'
                },
                {
                    id: 11,
                    text: 'Draggable11'
                },
                {
                    id: 12,
                    text: 'Draggable12'
                },
            ]
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <React.Fragment>
                <Container 
                    id="container1" 
                    orientation="vertical"
                    groupName="col"
                    onDragStart={(e: any) => console.log('drag started',e)}
                    onDragEnd={(e: any) => console.log('drag end',e)}
                    onDrop={(e: any)=> this.onCardDrop("container1", e)}
                    getChildPayload={(index: number)=>{
                        return this.getCardPayload("container1", index)
                    }}
                    dragClass=""
                    dropClass=""
                    onDragEnter={()=>{console.log("drag enter contianer")}}
                    onDragLeave={()=>{console.log("drag leave contianer")}}
                    onDropReady={()=>{console.log("drop ready contianer")}}
                >
                    {this.state.container1.map((card: any, index: number) => (
                        <Draggable key={card.id}>{card.text}</Draggable>
                    ))}
                </Container>
                <hr/>
                <Container 
                    id="contianer2" 
                    orientation="vertical"
                    groupName="col"
                    onDragStart={(e: any) => console.log('drag started',e)}
                    onDragEnd={(e: any) => console.log('drag end',e)}
                    onDrop={(e: any)=> this.onCardDrop("container2", e)}
                    getChildPayload={(index: number)=>{
                        return this.getCardPayload("container2", index)
                    }}
                    dragClass=""
                    dropClass=""
                    onDragEnter={()=>{console.log("drag enter contianer2")}}
                    onDragLeave={()=>{console.log("drag leave contianer2")}}
                    onDropReady={()=>{console.log("drop ready contianer2")}}
                >
                    {this.state.container2.map((card: any, index: number) => (
                        <Draggable key={card.id}>{card.text}</Draggable>
                    ))}
                </Container>
                <hr/>
                <Container 
                    id="container3" 
                    orientation="vertical"
                    groupName="col"
                    onDragStart={(e: any) => console.log('drag started',e)}
                    onDragEnd={(e: any) => console.log('drag end',e)}
                    onDrop={(e: any)=> this.onCardDrop("container3", e)}
                    getChildPayload={(index: number)=>{
                        return this.getCardPayload("container3", index)
                    }}
                    dragClass=""
                    dropClass=""
                    onDragEnter={()=>{console.log("drag enter contianer3")}}
                    onDragLeave={()=>{console.log("drag leave contianer3")}}
                    onDropReady={()=>{console.log("drop ready contianer3")}}
                >
                    {this.state.container3.map((card: any, index: number) => (
                        <Draggable key={card.id}>{card.text}</Draggable>
                    ))}
                </Container>
            </React.Fragment>
        )
    }
    onCardDrop(columnId: string, dropEvent: any): any {
        console.log("onCardDrop", columnId, dropEvent)
        if(dropEvent.addedIndex || dropEvent.addedIndex===0) {
            var state = {...this.state};
            var fromColumn = state[dropEvent.payload.columnId];
            fromColumn.splice(dropEvent.payload.index,1);
            console.log('fromColumn',[...fromColumn]);
            var payload = {...dropEvent.payload};
            delete payload.columnId;
            delete payload.index;
            var toColumn = state[columnId];
            toColumn.splice(dropEvent.addedIndex,0,payload);
            console.log('toColumn',[...toColumn]);
            this.setState({
                container1: [...state.container1],
                container2: [...state.container2],
                container3: [...state.container3],
            })
        }
    }
    getCardPayload = (columnId: string, index: number) => {
        console.log("getCardPayload",columnId, index, {...this.state[columnId][index],index,columnId});
        return {...this.state[columnId][index],index,columnId};
    }
}

export default App;