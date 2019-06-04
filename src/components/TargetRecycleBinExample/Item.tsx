import * as React from 'react';
import { DragSource, DragSourceMonitor } from 'react-dnd';

class Item extends React.Component<any> {

    render() {
        const { isDragging,  connectDragSource, item } = this.props;
        const opacity =  isDragging ? 0 :1;
        return connectDragSource(
            <div className="item" style={{opacity}}>
                {this.props.item.name}
            </div>
        )
    }

}

const itemSource = {
    beginDrag(props: any) {
        console.log("===BeginDrag===",props);
        return props.item;
    },
    endDrag(props: any, monitor: DragSourceMonitor, component: any) {
        console.log("===BeginDrag===",props);
        if(!monitor.didDrop()) {
            return;
        }
        return props.handleDrop(props.item);
    }
};

function collect(connect: any, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}


export default DragSource('item', itemSource, collect)(Item);