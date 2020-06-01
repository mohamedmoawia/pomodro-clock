import React from 'react';

const SetTimer = (props) => {
    const id = props.title.toLowerCase();
    return (
        <div className='timer-container'>
            <h2 id={`${id}-label`}>{props.title} length</h2>

            <div className='flex actions'>
                <i className="fas fa-arrow-up" id={`${id}-increment`} onClick={props.handleIncrease}></i>
                <span id={`${id}-length`}>{props.count}</span>
                <i className="fas fa-arrow-down" id={`${id}-decrement`} onClick={props.handleDecrease}></i>
            </div>
        </div>
    )
}
export default SetTimer