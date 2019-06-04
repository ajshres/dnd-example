import * as React from 'react';
import { IJourneyBubble } from './App';
import { SVGSemiCircle } from './SVGSemiCircle';
import Droppable from './Droppable';
export const MarkersSVG: React.SFC = () => (
    <defs>
        <marker id="arrow" markerWidth="4" markerHeight="10" viewBox="-2 -4 4 4" refX="0" refY="0" markerUnits="strokeWidth" orient="auto">
            <polyline points="-2,-2 0,0 -2,2" stroke="#443c3d" stroke-width="0.75px" fill="#000"/>
        </marker>
    </defs>
); /* Add additional marker if needed. No props allowed */


export interface ISVGRowComponent {
    transistionY: string;
    journey: IJourneyBubble[];
    hasNext: boolean;
}

export const LeftToRightComponent: React.SFC<ISVGRowComponent> = (props) => {
    const first = props.journey.length && props.journey[0] || null;
    const second = props.journey.length > 1 && props.journey[1] || null;
    let firstComponent: any = null;
    let secondComponent: any = null;

    if(first && Object.keys(first).length > 0) {
        firstComponent = <Droppable translateX="136" transistionY={props.transistionY || "0"} text={first.journeyValue} id={first.id} key={first.id} />
    } else if(first && Object.keys(first).length ===0) {
        firstComponent = <Droppable translateX="136" transistionY={props.transistionY || "0"} text="" id="e" key={"EMPTY"+136+props.transistionY} />//empty droppable
    }
    if(second && Object.keys(second).length > 0) {
        secondComponent = <Droppable translateX="268" transistionY={props.transistionY || "0"} text={second.journeyValue} id={second.id} key={second.id} />
    } else if(second && Object.keys(second).length ===0) {
        secondComponent = <Droppable translateX="268" transistionY={props.transistionY || "0"} text="" id="e" key={"EMPTY"+268+props.transistionY} />//empty droppable
    }
    

    return (
        <React.Fragment>
            <line x1="100" x2="400" y1="50" y2="50" stroke-width="2" stroke="#443c3d" stroke-dasharray="8" />

            {props.hasNext ? <SVGSemiCircle type="right" /> : null }
            {firstComponent}
            {secondComponent}
            {/* <Droppable translateX="136" text="Step #1" id="1" key={"1"} />
            <Droppable translateX="268" text="Step #2" id="2" key={"2"} /> */}
        </React.Fragment>
    );
}

export const RightToLeftComponent: React.SFC<ISVGRowComponent> = (props) => {
    const first = props.journey.length > 1 && props.journey[1] || null;
    const second = props.journey.length && props.journey[0] || null;
    let firstComponent: any = null;
    let secondComponent: any = null;

    if(first && Object.keys(first).length > 0) {
        firstComponent = <Droppable translateX="136" translateY={props.transistionY || "0"} text={first.journeyValue} id={first.id} key={first.id} />
    } else if(first && Object.keys(first).length ===0) {
        firstComponent = <Droppable translateX="136" translateY={props.transistionY || "0"} text="" id="e" key={"EMPTY"+136+props.transistionY} />//empty droppable
    }
    if(second && Object.keys(second).length > 0) {
        secondComponent = <Droppable translateX="268" translateY={props.transistionY || "0"} text={second.journeyValue} id={second.id} key={second.id} />
    } else if(second && Object.keys(second).length ===0) {
        secondComponent = <Droppable translateX="268" translateY={props.transistionY || "0"} text="" id="e" key={"EMPTY"+268+props.transistionY} />//empty droppable
    }
    

    return (
        <React.Fragment>
            <line x1="100" x2="400" y1="50" y2="50" stroke-width="2" stroke="#443c3d" stroke-dasharray="8" />

            {props.hasNext ? <SVGSemiCircle type="left" /> : null }
            {firstComponent}
            {secondComponent}
            {/* <Droppable translateX="136" text="Step #1" id="1" key={"1"} />
            <Droppable translateX="268" text="Step #2" id="2" key={"2"} /> */}
        </React.Fragment>
    );
}