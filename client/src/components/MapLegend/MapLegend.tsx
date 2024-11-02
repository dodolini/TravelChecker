import React from 'react'
import './MapLegend.css'


const MapLegend = () => {

    return (
        <div className='mapLegend'>
            <h1>Legend</h1>
            <div className='legendRow'>
                <div className='legendBox legendGreenBox'/>
                <div className='legendDescription'><span>Visited</span> country</div>
            </div>  
            <div className='legendRow'>
                <div className='legendBox legendBlueBox'/>
                <div className='legendDescription'><span>Want to see</span> country</div>
            </div>  
            <div className='legendRow'>
                <div className='legendBox legendRedBox'/>
                <div className='legendDescription'><span>Searched</span> country</div>
            </div>  
        </div>
    )
}

export default MapLegend