import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
const Shape = [
    [
        true, true, true,
        true		, true,
        true, false, true,
        true		, true,
        true, true, true,
    ],
    [
        false, false, true,
        false		, true,
        false, false, true,
        false		, true,
        false, false, true,
    ],
    [
        true, true, true,
        false		, true,
        true, true, true,
        true		, false,
        true, true, true,
    ],
    [
        true, true, true,
        false		, true,
        true, true, true,
        false		, true,
        true, true, true,
    ],
    [
        true, false, true,
        true		, true,
        true, true, true,
        false		, true,
        false, false, true,
    ],
    [
        true, true, true,
        true		, false,
        true, true, true,
        false		, true,
        true, true, true,
    ],
    [
        true, false, false,
        true		, false,
        true, true, true,
        true		, true,
        true, true, true,
    ],
    [
        true, true, true,
        false		, true,
        false, false, true,
        false		, true,
        false, false, true,
    ],
    [
        true, true, true,
        true		, true,
        true, true, true,
        true		, true,
        true, true, true,
    ],
    [
        true, true, true,
        true		, true,
        true, true, true,
        false		, true,
        false, false, true,
    ],
]; // 숫자 표시용 배열
const Block = (props) => {
    return <div className={`block ${props.margin ? `margin` : ``} ${props.activated ? `activated` : ``}`}></div>
}
// 블럭 함수 컴포넌트
class Colon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clocking: false
        }
    }

    componentWillMount() {
        this.clocking = setInterval(() => {
            this.setState({ clocking: !this.state.clocking });
        }, 500);
    } // 컴포넌트가 업데이트 될때 setInterval로 clocking을 계속 바꿔줌

    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(nextProps) != JSON.stringify(this.props)) ||
            (JSON.stringify(nextState) != JSON.stringify(this.state));
    }// 이건 리턴값에 따라서 업뎃하는건지.. 잘 모르겠음

    render() {
        return (
            <div className="colon">
                <Block activated={this.state.clocking} />
                <Block activated={this.state.clocking} />
            </div>
        )
    }
}
// 콜론( : ) 표시용 컴포넌트 인듯
class Number extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }

    render() {
        const Blocks = _.map(Shape[this.props.number], (i, key) => {
            return <Block key={key} margin={key == 3 || key == 8} activated={i} />
        })

        return (
            <div className="number">
                {Blocks}
            </div>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: ""
        };

        this.getTime = this.getTime.bind(this);
        this.timeInterval = this.timeInterval.bind(this);
    }

    componentWillMount() {
        this.interval = setInterval(this.timeInterval, 1000 / 60);
    }

    getTime() {
        return moment().format("HHmmss");
    }

    timeInterval() {
        const date = this.getTime();

        if (this.oldDate != date) {
            this.oldDate = date;
            this.setState({ date });
        }
    }

    render() {
        const Numbers = _.map(this.state.date.split(""), (i, key) => {
            return (
                <div key={key}>
                    {key != 0 && key % 2 == 0 && <Colon />}
                    <Number number={i} />
                </div>
            )
        });
        return (
            <div className="app">
                {Numbers}
            </div>
        )
    }
}

export default App;

