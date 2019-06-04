import * as React from 'react';
import SmoothDnD from 'smooth-dnd';

class App extends React.Component {
    container: any = null;
    container2: any = null;
    componentDidMount(){
        this.container = SmoothDnD(document.getElementById('contianer'),{groupName:'dd'});
        this.container2 = SmoothDnD(document.getElementById('contianer2'),{groupName:'dd'});
    }
    render() {
        return (
            <React.Fragment>
                <div id="contianer">
                    <div>Draggable 1</div>
                    <div>Draggable 2</div>
                    <div>Draggable 3</div>
                </div>
                <div id="contianer2">
                    <div>Draggable 4</div>
                    <div>Draggable 5</div>
                    <div>Draggable 6</div>
                </div>
            </React.Fragment>
        )
    }
}

export default App;