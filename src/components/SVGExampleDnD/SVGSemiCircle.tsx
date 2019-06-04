import * as React from 'react';

export const SVGSemiCircle: React.SFC<{type: "left"|"right", translateY?: string}> = (props) => {
        const semiCircle = props.type === "right" ?
        (<path d="M 400 50 C 490 50, 490 150, 400 150"
            fill="none"
            stroke-width="2"
            stroke="#443c3d" stroke-dasharray="10"
            stroke-linejoin="bevel"
        />):
        (<path d="M 100 50 C 10 50, 10 150, 100 150"
            fill="none"
            stroke-width="2"
            stroke="#443c3d" stroke-dasharray="10"
            stroke-linejoin="bevel"
        />)
        return props.translateY ? <g transform={`translate(0,${props.translateY})`}>{semiCircle}</g>: <g>{semiCircle}</g>;
};