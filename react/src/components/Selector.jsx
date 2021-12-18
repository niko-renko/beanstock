import React from 'react';

class Selector extends React.Component
{
    constructor(props)
    {
        super(props);

        const {
            selected
        } = props;

        this.state = {
            immediateSelected: selected,
            hovering: false,
            focused: false,
            query: ''
        };

        this.input = React.createRef();

        this.removeTimeout = null;
        this.addTimeout = null;

        return;
    }

    setImmediateSelected = immediateSelected => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                immediateSelected
            }
        )
    );

    setHovering = hovering => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                hovering
            }
        )
    );

    setFocused = focused => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                focused
            }
        )
    );

    setQuery = query => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                query
            }
        )
    );

    render()
    {
        const {
            width,
            height,
            setSelected,
            items
        } = this.props;

        const {
            immediateSelected,
            hovering,
            focused,
            query
        } = this.state;

        const {
            input,
            removeTimeout,
            addTimeout,
            setImmediateSelected,
            setHovering,
            setFocused,
            setQuery
        } = this;

        // Styles

        const containerStyle = {
            width,
            height,
            display: 'flex',
            flexDirection: 'column'
        };

        const selectedStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            background: '#31333f'
        };

        const selectedItemStyle = {
            background: '#31333F',
            color: '#63C866',
            border: '1px solid #63C866',
            borderRadius: '5px',
            margin: '8px'
        };

        const inputStyle = {
            background: '#31333f',
            color: 'white',
            outline: 'none',
            border: 'none',
            margin: '8px'
        };

        const listStyle = {
            color: 'white',
            margin: '0',
            padding: '0',
            overflow: 'auto'
        };

        const itemStyle = {
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            background: 'black'
        };

        const selectedItems = immediateSelected.map(
            ticker => (
                <button
                    key={ticker}
                    style={selectedItemStyle}
                    onMouseOver={
                        event => {
                            event.target.style.background = '#63C866';
                            event.target.style.color = '#31333F';
                            return;
                        }
                    }
                    onMouseLeave={
                        event => {
                            event.target.style.background = '#31333F';
                            event.target.style.color = '#63C866';
                            return;
                        }
                    }
                    onClick={
                        event => {
                            const copy = [
                                ...immediateSelected
                            ];

                            copy.splice(
                                copy.indexOf(ticker),
                                1
                            );

                            setImmediateSelected(copy);

                            clearTimeout(removeTimeout);
                            this.removeTimeout = setTimeout(
                                () => setSelected(copy),
                                500
                            );

                            return;
                        }
                    }
                >
                    {ticker}
                    &times;
                </button>
            )
        );

        const listItems = items
            .filter(
                ticker => ticker
                    .toLocaleLowerCase()
                    .startsWith(
                        query.toLowerCase()
                    )
                    &&
                    !immediateSelected.includes(ticker)
            )
            .map(
                ticker => (
                    <li
                        key={ticker}
                        style={itemStyle}
                        onClick={
                            event => {
                                setQuery('');
                                setImmediateSelected(
                                    [
                                        ...immediateSelected,
                                        event.target.innerHTML
                                    ]
                                );

                                clearTimeout(addTimeout);
                                this.addTimeout = setTimeout(
                                    () => setSelected(
                                        [
                                            ...immediateSelected,
                                            event.target.innerHTML
                                        ]
                                    ),
                                    500
                                );

                                return;
                            }
                        }
                        onMouseOver={
                            event => {
                                event.target.style.background = 'grey';
                                return;
                            }
                        }
                        onMouseLeave={
                            event => {
                                event.target.style.background = 'black';
                                return;
                            }
                        }
                    >
                        {ticker}
                    </li>
                )
            );

        return (
            <div
                style={containerStyle}
            >
                <div
                    style={selectedStyle}
                    onClick={
                        () => {
                            input.current.focus();
                            return;
                        }
                    }
                >
                    {
                        selectedItems
                    }
                    <input
                        style={inputStyle}
                        ref={input}
                        placeholder='Select Stocks'
                        value={query}
                        onChange={
                            event => {
                                setQuery(event.target.value);
                                return;
                            }
                        }
                        onFocus={
                            event => {
                                setFocused(true);
                                return;
                            }
                        }
                        onBlur={
                            event => {
                                setFocused(false);
                                return;
                            }
                        }
                    />
                </div>
                {
                    // hovering || focused ?
                    (
                        <ul
                            style={listStyle}
                            onMouseOver={
                                event => {
                                    setHovering(true);
                                    return;
                                }
                            }
                            onMouseLeave={
                                event => {
                                    setHovering(false);
                                    return;
                                }
                            }
                        >
                            {
                                listItems
                            }
                        </ul>
                    )
                    // :
                    // null
                }
            </div>
        );
    }
}

export default Selector;