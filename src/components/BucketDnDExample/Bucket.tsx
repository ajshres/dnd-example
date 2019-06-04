import * as React from 'react';
import {
	DragSource,
	ConnectDragSource,
	DragSourceConnector,
	DragSourceMonitor,
    DragSourceSpec,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import { XYCoord } from 'dnd-core'

const style = {
    border: '1px dashed gray',
    display:"inline-block",
    padding: '0.5rem 1rem',
    marginRight:"5px",
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource: DragSourceSpec<ICardProps, IDragObject> = {
	beginDrag(props: ICardProps) {
		return {
			id: props.id,
            index: props.index,
            text: props.text
		}
    },
    // Remove this line after development is over. Not needed
    endDrag: (props: ICardProps, monitor: DragSourceMonitor) => {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            alert(`You dropped ${item.text} into ${dropResult.text}!`)
        }
    },
}

export interface ICardProps {
	id: any
	text: string;
    index: number;
    type?: string
	moveCard: (dragIndex: number, hoverIndex: number) => void
}

export interface IDragObject {
    id: any;
    text: string;
    index: number;
    type?: string;
}

interface CardSourceCollectedProps {
	isDragging: boolean;
	connectDragSource: ConnectDragSource;
}

class Card extends React.Component<
	ICardProps & CardSourceCollectedProps
> {
	public render() {
		const {
			text,
			isDragging,
			connectDragSource,
        } = this.props
        // when dragging the item
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(
			<li ref={connectDragSource as any} style={{ ...style, opacity }}>{text}</li>,
		)
	}
}

export default DragSource<ICardProps, CardSourceCollectedProps>(
    ItemTypes.BOX,
	cardSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Card as any)