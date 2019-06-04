import * as React from 'react';
import { DropTarget } from 'react-dnd';

class Target extends React.Component<any> {
    render () {
        const { connectDropTarget, hovered, item } = this.props;
        const background = hovered? 'lightgreen':'white';
        return connectDropTarget(
            <div className="target" style={{background}}>
                Target
            </div>
        );
    }
}

const itemTarget = {

};

function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}

export default DropTarget('item', itemTarget, collect)(Target);
