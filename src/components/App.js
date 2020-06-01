import React from 'react';
import SetTimer from './SetTimer';
import './App.css';

const audio = document.getElementById('beep');

class App extends React.Component {
    state = {
        breakCount: 5,
        sessionCount: 25,
        timerON: false,
        clockCount: 25 * 60,
        currentTimer: 'Session'
    }
/********************************************************************/ 
    handlePlayPause = () => {
        const { timerON } = this.state;
        if (timerON) {
            clearInterval(this.loop)
            this.setState({ timerON: false })
        } else {
            this.setState({ timerON: true })
            this.loop = setInterval(() => {
                const {
                    breakCount,
                    sessionCount,
                    clockCount,
                    currentTimer,
                } = this.state
                if (clockCount === 0) {
                    this.setState({
                        currentTimer: (currentTimer === 'Session' ? 'Break' : 'Session'),
                        clockCount: (currentTimer === 'Session' ? (breakCount * 60) : (sessionCount * 60))
                    })
                    audio.play();

                } else {
                    this.setState({ clockCount: clockCount - 1 })
                }
            }, 1000);
        }
    }
    /****************************************************************************************** */
    handleReset = () => {
        this.setState({
            breakCount: 5,
            sessionCount: 25,
            timerON: false,
            clockCount: 25 * 60,
            currentTimer: 'Session'
        })
        clearInterval(this.loop);
        audio.pause();
        audio.currentTime = 0
    }
    /****************************************************************************************** */
    handleSessionIncrement = () => {
        const { sessionCount, currentTimer, timerON } = this.state;
        if (sessionCount < 60) {
            if (!timerON && currentTimer === 'Session') {
                this.setState({
                    sessionCount: sessionCount + 1,
                    clockCount: (sessionCount + 1) * 60
                })
            } else {
                this.setState({
                    sessionCount: sessionCount + 1
                })
            }
        }
    }
    /****************************************************************************************** */
    handleBreakIncrement = () => {
        const { breakCount, currentTimer, timerON } = this.state;
        if (breakCount < 60) {
            if (!timerON && currentTimer === 'Break') {
                this.setState({
                    breakCount: breakCount + 1,
                    clockCount: (breakCount + 1) * 60
                })
            } else {
                this.setState({
                    breakCount: breakCount + 1
                })
            }
        }
    }
    /****************************************************************************************** */
    handleBreakDecrement = () => {
        const { breakCount, currentTimer, timerON } = this.state;
        if (breakCount > 1 ) {
            if (!timerON && currentTimer === 'Break') {
                this.setState({
                    breakCount: breakCount - 1,
                    clockCount: (breakCount - 1) * 60
                })
            } else {
                this.setState({
                    breakCount: breakCount - 1
                })
            }
        }
    }
    /****************************************************************************************** */
    handleSessionDecrement = () => {
        const { sessionCount, currentTimer, timerON } = this.state;
        if (sessionCount > 1) {
            if (!timerON && currentTimer === 'Session') {
                this.setState({
                    sessionCount: sessionCount - 1,
                    clockCount: (sessionCount - 1) * 60
                })
            } else {
                this.setState({
                    sessionCount: sessionCount - 1
                })
            }
        }
        
    }
/****************************************************************************************** */
    convertTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60

        minutes = minutes < 10 ? ('0' + minutes) : (minutes);
        seconds = seconds < 10 ? ('0' + seconds) : (seconds);

        return `${minutes}:${seconds}`;
    }
    /****************************************************************************************** */
    render() {
        const { breakCount, sessionCount } = this.state;
        const breakProps = {
            title: 'Break',
            count: breakCount,
            handleDecrease: this.handleBreakDecrement,
            handleIncrease: this.handleBreakIncrement
        }
        const sessionProps = {
            title: 'Session',
            count: sessionCount,
            handleDecrease: this.handleSessionDecrement,
            handleIncrease: this.handleSessionIncrement,
        }
        const { clockCount, currentTimer, timerON } = this.state;

        return (
            <div className='app'>
                <div className='flex'>
                    <SetTimer {...breakProps} />
                    <SetTimer {...sessionProps} />
                </div>
                <div className='clock-container'>
                    <h1 id='timer-label'>{currentTimer}</h1>
                    <span id='time-left'>{this.convertTime(clockCount)}</span>
                    <div>
                        <i className={`fas fa-${timerON ? 'pause' : 'play'}`} id='start_stop' onClick={this.handlePlayPause} />
                        <i className='fas fa-sync-alt' id='reset' onClick={this.handleReset} />
                    </div>
                </div>
            </div>
        )
    }
}
export default App