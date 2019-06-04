import * as React from 'react';
import { DropTarget, ConnectDropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { findDOMNode } from 'react-dom';
import { XYCoord } from 'dnd-core'

class Droppable extends React.Component <DroppableProps> {
    render() {
        const { connectDropTarget, isOver, canDrop, text} = this.props;
        const isActive = canDrop && isOver;
        let fillColor = "#ccc";
        if(canDrop) {
            if(isOver) {
                fillColor = "#66cc00";
            } else {
                fillColor = "blue";
            }
        }
        return (<g ref={connectDropTarget as any} transform={`translate(${this.props.translateX, this.props.translateY})`}>
                <rect fill={fillColor} x="2" y="10" rx="3" ry="3" width="80" height="80" />
                <text x="9" y="42" font-family="Open Sans Condensed" font-size="12" stroke="none" fill="#fff" font-weight="900" >Workflow
                    <tspan x="9" dy="17">{text}</tspan>
                </text>
            </g>);
    }
}

interface CardTargetCollectedProps {
	connectDropTarget: ConnectDropTarget
}

const cardTarget = {
    
	hover(props: DroppableProps, monitor: DropTargetMonitor, component: Droppable | null) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = (findDOMNode(
			component,
		) as Element).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
        return {
            id: props.id,
            index: props.index,
            text: props.text,
        }
    },
    drop(props: DroppableProps, monitor: DropTargetMonitor, component: Droppable | null) {
        console.log("Dropped", props, monitor.getItem(), monitor.getItemType(), component);
    }
}

export interface DroppableProps {
	translateX: string;
	translateY?: string;
	id: any;
	text: string
	index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
    
    canDrop: boolean;
    isOver: boolean;
    connectDropTarget: ConnectDropTarget;
}

export default DropTarget<DroppableProps, CardTargetCollectedProps>(
	[ItemTypes.CARD, ItemTypes.SMILEY],
	cardTarget,
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
	}),
)(Droppable as any)