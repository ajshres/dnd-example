import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Droppable from './Droppable';
import { SVGSemiCircle } from './SVGSemiCircle';
import Draggable from './Draggable';
import ItemTypes from './ItemTypes';
import { string } from 'prop-types';
import { MarkersSVG, LeftToRightComponent, RightToLeftComponent } from './SVGComponents';
import _ from 'lodash';

interface State {
    journeyListBefore: IJourneyBubble[];
    journeyListAfter: IJourneyBubble[];
    translateYStep: number; // Defines Curve
}
  
export interface IJourneyBubble<J = any, B = any, S = any> {
    id?: string; // From Backend if needed
    smiley?: S; // Can not be added by user
    banks?: B[]; // Can not be added by user
    journeyValue?: J; // Can be added by user. Need Design for it. Also Backend structure.
    type?: string;// FLAG
    color?: string;//
}

const JourneyListBefore: IJourneyBubble[] = [
    {
        id: "1",
        smiley: "1",
        banks: ["RBC"],
        journeyValue:"Before 1"

    },
    {
        id: "2",
        smiley: "2",
        banks: ["RBC"],
        journeyValue:"Before 2"

    },
    {
        id: "3",
        smiley: "1",
        banks: ["RBC"],
        journeyValue:"Before 3"

    },
    {
        id: "4",
        smiley: "1",
        banks: ["RBC"],
        journeyValue:"Before 4"

    },
    {
        id: "5",
        smiley: "5",
        banks: ["RBC"],
        journeyValue:"Before 5"

    },
    {
        id: "6",
        smiley: "6",
        banks: ["RBC"],
        journeyValue:"Before 6"

    },
];
const JourneyListAfter: IJourneyBubble[] = [
    {
        id: "1",
        smiley: "1",
        banks: ["RBC"],
        journeyValue:"Before 1"

    },
    {
        id: "2",
        smiley: "2",
        banks: ["RBC"],
        journeyValue:"Before 2"

    },
    {
        id: "3",
        smiley: "1",
        banks: ["RBC"],
        journeyValue:"Before 3"

    },
    {
        id: "4",
        smiley: "1",
        banks: ["RBC"],
        journeyValue:"Before 4"

    },
    {
        id: "5",
        smiley: "5",
        banks: ["RBC"],
        journeyValue:"Before 5"

    },
    {
        id: "6",
        smiley: "6",
        banks: ["RBC"],
        journeyValue:"Before 6"

    },
];


class SVGExampleDnD extends React.Component<any, State> {
    constructor (props: any) {
        super(props);
        this.state = {
            journeyListAfter:JourneyListBefore,
            journeyListBefore: JourneyListAfter,
            translateYStep: 100
        }
    }

    createJourneyBubble<J=any> (journeValue?: J) {

    }

    mashBubbleJourney = () => {
        
    }
    render () {
        const list = [...this.state.journeyListBefore, {}, {id:"FLAG", type:"FLAG" } , {}, ...this.state.journeyListAfter];
        const chunkList = _.chunk(list, 2);
        let transistionY = 0;
        const listOfSVG: any = [];
        chunkList.forEach((cList, index)=>{
            if(index%2 === 0) {
                listOfSVG.push(<LeftToRightComponent key={`chunkListRTL-${index}`} transistionY={`${transistionY}`} journey={cList} hasNext={chunkList.length > index + 1} />)
            } else {
                listOfSVG.push(<RightToLeftComponent key={`chunkListLTR-${index}`} transistionY={`${transistionY}`} journey={cList} hasNext={chunkList.length > index + 1} />)
            }
            transistionY += 100;
        })
        return (
            <React.Fragment>
                <ul style={{
                    listStyle: "none",
                    marginLeft: "0px",
                    paddingLeft: "0px",
                }}>
                    <Draggable text="Text 1"/>
                    <Draggable text="Text 2"/>
                    <Draggable text="Smiley 3" type={ItemTypes.SMILEY} />
                    <Draggable text="Smiley 4" type={ItemTypes.SMILEY} />
                    <Draggable text="Can not be dropped 5" type={ItemTypes.BOX} />
                </ul>
                <div className="svg-container">
                    {/*viewBox="X Y WIDTH HEIGHT" */}
                    <svg version="1.1" viewBox="0 0 600 600" preserveAspectRatio="xMinYMin meet" className="svg-content">
                        <MarkersSVG />
                        {listOfSVG}

                        <g className="box-group" transform="translate(0,200)">
                            
                            <line x1="400" x2="500" y1="50" y2="50" stroke-width="2" stroke="#443c3d" stroke-dasharray="8" marker-end="url(#arrow)"/>
                            <g transform="translate(500)">
                                <rect fill="#fff" x="2" y="10" rx="3" ry="3" width="80" height="80" />
                                <text x="9" y="42" font-family="Open Sans Condensed" font-size="12" stroke="none" fill="#000" font-weight="900" >Workflow
                                    <tspan x="9" dy="17">Step #2</tspan>
                                </text>
                            </g>
                        </g>
                    </svg>
                </div>
            </React.Fragment>
        )
    }   
}

export default DragDropContext(HTML5Backend)(SVGExampleDnD)
