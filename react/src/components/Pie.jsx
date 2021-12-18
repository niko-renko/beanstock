import React from 'react';

import {
    VictoryPie,
    VictoryContainer,
    VictoryTooltip
} from 'victory';

import randomcolor from 'randomcolor';

class Pie extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
        };

        return;
    }

    render()
    {
        const {
            width,
            height,
            points
        } = this.props;

        // Styles

        const pieStyle = {
            labels: {
                fontSize: 12,
                fill: "#EEEEEE"
              }
        };

        return (
            <VictoryPie
                width={width}
                height={height}
                containerComponent={
                    <VictoryContainer
                        responsive={false}
                    />
                }
                x={
                    point => point[0]
                }
                y={
                    point => point[1]
                }
                data={
                    Object
                        .entries(points)
                        .filter(
                            point => point[1] !== 0
                        )
                }
                colorScale={
                    Object
                        .entries(points)
                        .map(
                            point => randomcolor(
                                {
                                    seed: point[0],
                                    luminosity: 'light'
                                }
                            )
                        )
                }
                style={pieStyle}
            />
        );
    }
}

export default Pie;