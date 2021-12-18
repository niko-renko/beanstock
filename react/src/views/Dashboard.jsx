import React from 'react';

import Selector from '../components/Selector';
import Slider from '../components/Slider';
import Graph from '../components/Graph';
import Pie from '../components/Pie';

const tickers = [
  'AMZN',
  'MSFT',
  'TSLA',
  'GOOG',
  'AAPL',
  'FB',
  'JNJ',
  'V',
  'PG'
];

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            rollingPeriod: 5,
            selectedTickers: [],
            optimized: null
        };

        return;
    }

    setSelectedTickers = selectedTickers => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                selectedTickers
            }
        )
    );

    setRollingPeriod = rollingPeriod => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                rollingPeriod
            }
        )
    );

    setOptimized = optimized => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                optimized
            }
        )
    );

    componentDidUpdate(
        prevProps,
        prevState
    )
    {
        const {
            token
        } = this.props;

        const {
            selectedTickers,
            rollingPeriod
        } = this.state;

        const {
            setOptimized
        } = this;

        if(
            selectedTickers.length &&
            (
                selectedTickers.length !== prevState.selectedTickers.length ||
                rollingPeriod !== prevState.rollingPeriod
            )
        ) fetch(
            'http://localhost:8000/optimize',
            {
                method: 'POST',
                headers:
                {
                    'Token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        tickers: selectedTickers,
                        rollingPeriod: Number(rollingPeriod)
                    }
                )
            }
        )
            .then(
                response => response.json()
            )
            .then(
                setOptimized
            );

        return;
    }

    render()
    {
        const {
            selectedTickers,
            rollingPeriod,
            optimized
        } = this.state;

        const {
            setSelectedTickers,
            setRollingPeriod
        } = this;

        // Styles

        const containerStyle = {
            minHeight: '92vh',
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };

        const messageStyle = {
            color: '#EEEEEE',
            fontFamily: 'sans-serif',
            paddingTop: '30px',
            paddingBottom: '30px'
        };

        return (
            <div
                style={containerStyle}
            >
                <h1
                    style={messageStyle}
                >
                    Welcome to your BeanStock Dashboard!
                </h1>
                <Selector
                    width='900px'
                    height='300px'
                    selected={selectedTickers}
                    setSelected={setSelectedTickers}
                    items={tickers}
                />
                <Slider
                    width='900px'
                    height='50px'
                    min={1}
                    max={100}
                    value={rollingPeriod}
                    setValue={setRollingPeriod}
                />
                {
                    optimized && selectedTickers.length
                    ?
                    <>
                        Annualized Return: {
                            (optimized.annualizedReturn * 100).toFixed(2)
                        }%
                        <br/>
                        Annualized Volatility: {
                            (optimized.annualizedVolatility * 100).toFixed(2)
                        }%
                        <br/>
                        Sharpe Ratio: {
                            optimized.sharpeRatio.toFixed(2)
                        }
                        <Pie
                            width={500}
                            height={500}
                            points={
                                optimized.resourceAllocation
                            }
                        />
                        <Graph
                            width={900}
                            height={500}
                            lines={
                                selectedTickers.length > 1 ?
                                {
                                    portfolio: optimized.portfolioRelativeGrowth,
                                    ...optimized.stockRelativeGrowth
                                }
                                :
                                optimized.stockRelativeGrowth
                            }
                        />
                        <Graph
                            width={900}
                            height={500}
                            lines={
                                {
                                    'Daily Returns': optimized.dailyReturns,
                                    'Rolling Volatility': optimized.rollingVolatility
                                }
                            }
                        />
                    </>
                    :
                    null
                }
            </div>
        );
    }
}

export default Dashboard;