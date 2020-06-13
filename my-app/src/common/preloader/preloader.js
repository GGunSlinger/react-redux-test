import React from 'react'
import preloader from '../../../assets/images/preloader.svg'

let Preloader = (props) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    }}>
        <img src={preloader} />
    </div>
}

export default Preloader