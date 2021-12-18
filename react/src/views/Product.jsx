import React from 'react';

class Product extends React.Component
{
    constructor(props)
    {
        super(props);
        return;
    }

    render()
    {
        // Styles

        const containerStyle = {
            minHeight: '92vh',
            background: '#000000'
        };

        return (
            <div
                style={containerStyle}
            ></div>
        );
    }
}

export default Product;