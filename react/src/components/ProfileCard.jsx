import React from 'react';
import styles from '../css/ProfileCard.module.css';

class ProfileCard extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const containerStyle = {
            width: '300px',
            height: '300px',
            margin: '10px',
            display: 'flex',
            display: 'flex',
            flexFlow: 'column wrap',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #63C866'
        }
        const profilePicture = {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `url(${this.props.imgAddress}) no-repeat`,
            backgroundSize: 'cover'
        }
        const name = {
            color: '#EEEEEE',
            textAlign: 'center',
            fontFamily: 'sans-serif'
        }
        const role = {
            color: '#63C866',
            textAlign: 'center',
            margin: '0'
        }
        return (
            <div
                style={containerStyle}
            >
                <div
                    style={profilePicture}
                >
                </div>
                <h2
                    style={name}
                >
                    {this.props.name}
                </h2>
                <p
                    style={role}
                    className={styles.role}
                >
                    {this.props.role}
                </p>
            </div>
        );
    }
}

export default ProfileCard