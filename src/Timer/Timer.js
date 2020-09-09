import React, {Component} from 'react'
import './Timer.css'


export default class Timer extends Component {
    state = {
        time: this.props.time,
        isActive: false,
        isFinished: false,
    }

    componentDidMount = () => {
        if (this.props.autostart) {
            this.startTimer()
            this.setState({isActive: true})
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.setState({isActive: false})
    }

    startTimer = () => {

        if (this.state.isActive === false) {
            this.setState((prevState) => {
                return {
                    isActive: !prevState.isActive
                }
            })

            if (this.props.onTimeStart) this.props.onTimeStart()
            
            this.interval = setInterval(() => {

                this.setState((prevState) => {
                    return {
                        time: prevState.time - this.props.step
                    }
                })
    
                if (this.state.time <= 0) {
                    clearInterval(this.interval)

                    if (this.props.infinite) {
                        this.setState({isFinished: false, time: this.props.time,isActive: false})
                        this.startTimer()
                    } else {
                        this.setState({isFinished: true, time: 0})
                    }

                    if (this.props.onTimeEnd) this.props.onTimeEnd()
                    
                }

                if (this.props.onTick) {
                    if (this.state.time >= 1) this.props.onTick(this.state.time)
                }

            }, this.props.step);
    
        } else {
            this.setState((prevState) => {
                return {
                    isActive: !prevState.isActive
                }
            })
            clearInterval(this.interval);

            if (this.props.onTimePause) this.props.onTimePause()
        }
    }

    msToHMinSec = (ms) => {
        let sec = parseInt((ms / 1000) % 60),
            min = parseInt((ms / (1000 * 60)) % 60),
            h = parseInt((ms / (1000 * 60 * 60)) % 24);
    
        h = (h < 10) ? '0' + h : h;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;

        return h + ':' + min + ':' + sec;
    }

    render() {
        return (
            <div className={this.state.isActive ? 'timer-wrapper' : 'timer-wrapper paused'}>
                <button onClick={this.startTimer}
                        className={this.state.isActive ? 'paused' : ''}
                        >{this.state.isActive ? 'Pause' : 'Start'}
                </button>
                <span>{this.state.isFinished ? 'Finish' : this.msToHMinSec(this.state.time)}</span>
                <div className="timer-bar-wrapper"><div className={this.props.infinite ? 'timer-bar infinite' : 'timer-bar'}
                                                        style={{animationDuration: this.props.time+ 'ms'}}></div></div>
            </div>
        )
    }
}
