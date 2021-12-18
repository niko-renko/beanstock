import React from 'react';
import ProfileCard from '../components/ProfileCard';
import nick from '../img/nick.jpg';
import ano from '../img/ano.jpg';
import yj from '../img/yj.jpg';


class About extends React.Component
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
            height: '92vh',
            minHeight: '92vh',
            width: '100%',
            background: '#000000',
            display: 'flex',
            flexDirection: 'space-evenly',
            justifyContent: 'center',
            alignItems: 'center'
        };

        return (
            <div
                style={containerStyle}
            >
                <ProfileCard
                    imgAddress={nick}
                    name='Nikolay Tokarenko'
                    role='< Full Stack Developer />'
                />
                <ProfileCard
                    imgAddress={ano}
                    name='Anomitro Paul'
                    role='< ML Developer />'
                />
                <ProfileCard
                    imgAddress={yj}
                    name='Yashasvi Jain'
                    role='< Frontend Developer />'
                />
            </div>
        );
    }
}

export default About;