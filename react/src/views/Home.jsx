import React from 'react';
import chartLine from '../img/chart-line.png';
import styles from '../css/Home.module.css';

class Home extends React.Component
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
                className={styles.container}
            >
                <div
                    className={styles.chartContainer}
                >
                    <div
                        className={styles.chartLine}
                    ></div>
                    <div
                        className={styles.chartCover}
                    ></div>
                    <div
                    className={styles.leftImage}
                    >
                    </div>
                    <div
                        className={styles.textbox}
                    >
                        <h1
                            className={styles.heading}
                        >
                            BeanStock
                        </h1>
                        <p
                            className={styles.paragraph}
                        >
                            We are providing an investment solution to financially empower common people by investing their spare change into the market as well as shield them from the risks using computational power.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;