import React from 'react';

import {
    VictoryChart,
    VictoryZoomContainer,
    VictoryLine,
    VictoryBrushContainer,
    VictoryAxis,
    VictoryLegend
} from 'victory';

import randomcolor from 'randomcolor';

class Graph extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            zoomDomain: null,
            selectedDomain: null
        };

        return;
    }

    setZoomDomain = zoomDomain => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                zoomDomain
            }
        )
    );

    setSelectedDomain = selectedDomain => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                selectedDomain
            }
        )
    );

    render()
    {
        const {
            width,
            height,
            lines
        } = this.props;

        const {
            zoomDomain,
            selectedDomain
        } = this.state;

        const {
            setZoomDomain,
            setSelectedDomain
        } = this;

        // Styles

        const axisStyle = {
            axis: {
                stroke: '#eeeeee'
            },
            tickLabels: {
                fontSize: 15,
                padding: 5,
                fill: '#eeeeee'
            }
        };

        const brushStyle = {
            stroke: 'transparent',
            fill: '#EEEEEE',
            fillOpacity: 0.5
        };

        const lineItems = Object
            .entries(lines)
            .map(
                (
                    [
                        name,
                        points
                    ]
                ) => (
                    <VictoryLine
                        key={name}
                        x={
                            point => new Date(point[0])
                        }
                        y={
                            point => point[1]
                        }
                        data={
                            Object.entries(points)
                        }
                        style={
                            {
                                data: {
                                    stroke: randomcolor(
                                        {
                                            seed: name,
                                            luminosity: 'light'
                                        }
                                    )
                                }
                            }
                        }
                    />
                )
            );

        return (
            <>
                <VictoryChart
                    padding={
                        {
                            top: 50,
                            bottom: 50,
                            left: 50,
                            right: 170
                        }
                    }
                    width={width}
                    height={height * 0.7}
                    containerComponent={
                        <VictoryZoomContainer
                            responsive={false}
                            zoomDimension={'x'}
                            zoomDomain={zoomDomain}
                            onZoomDomainChange={setSelectedDomain}
                        />
                    }
                >
                    <VictoryLegend
                        x={width - 150}
                        style={
                            {
                                labels: {
                                    fill: '#EEEEEE'
                                }
                            }
                        }
                        data={
                            Object
                                .entries(lines)
                                .map(
                                    (
                                        [
                                            name,
                                            points
                                        ]
                                    ) => (
                                        {
                                            name,
                                            symbol: {
                                                type: 'minus',
                                                fill: randomcolor(
                                                    {
                                                        seed: name,
                                                        luminosity: 'light'
                                                    }
                                                )
                                            }
                                        }
                                    )
                                )
                        }
                    >
                    </VictoryLegend>
                    {
                        lineItems
                    }
                    <VictoryAxis
                        fixLabelOverlap={true}
                        tickFormat={
                            x => new Date(x).getFullYear()
                        }
                        style={axisStyle}
                    />
                    <VictoryAxis
                        fixLabelOverlap={true}
                        dependentAxis={true}
                        style={axisStyle}
                    />
                </VictoryChart>

                <VictoryChart
                    width={width}
                    height={height * 0.3}
                    containerComponent={
                        <VictoryBrushContainer
                            responsive={false}
                            brushDimension={'x'}
                            brushDomain={selectedDomain}
                            onBrushDomainChange={setZoomDomain}
                            brushStyle={brushStyle}
                        />
                    }
                >
                    <VictoryAxis
                        tickFormat={
                            x => new Date(x).getFullYear()
                        }
                        style={axisStyle}
                    />
                    {
                        lineItems
                    }
                </VictoryChart>
            </>
        );
    }
}

export default Graph;