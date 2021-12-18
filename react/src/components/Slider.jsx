import React from 'react';

class Slider extends React.Component
{
    constructor(props)
    {
        super(props);

        const {
            value
        } = props;

        this.state = {
            immediateValue: value
        };

        this.timeout = null;

        return;
    }

    setImmediateValue = immediateValue => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                immediateValue
            }
        )
    );

    render()
    {
        const {
            width,
            height,
            setValue,
            min,
            max
        } = this.props;

        const {
            immediateValue
        } = this.state;

        const {
            setImmediateValue
        } = this;

        const containerStyle = {
            display: 'flex',
            alignItems: 'center',
            width,
            height,
        };

        const sliderStyle = {
            WebkitAppearance: 'none',
            width: '100%',
            height: '2px',
            backgroundColor: 'green'
        };

        return (
            <div
                style={containerStyle}
            >
                <input
                    style={sliderStyle}
                    type='range'
                    min={min}
                    max={max}
                    value={immediateValue}
                    onChange={
                        event => {
                            setImmediateValue(event.target.value);

                            clearTimeout(this.timeout);

                            this.timeout = setTimeout(
                                () => setValue(event.target.value),
                                500
                            );

                            return;
                        }
                    }
                />
            </div>
        );
    }
}

export default Slider;