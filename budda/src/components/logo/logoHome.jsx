import React from 'react';
import apt from '../../assets/img/apartment.svg';
import mlg from '../../assets/img/money-line-graph.svg';
import './logoHome.css';
import StartBtn from '../startButton/startBtn';

export default function LogoHome() {
  return (
    <div className="logohomewrapper">
      <div className="logohomecontainer">
        <div className="logohomebox">
          <div className="logohomeimg">
            <img className="homeapt" alt="Apartment" src={apt} />
            <img className="homemlg" alt="MoneyLineGraph" src={mlg} />
          </div>
          <div className="logohometext">
            <div className="logohomebudda">BUDDA</div>
            <div className="logohomekr">부동산을 다 예측하다</div>
          </div>
        </div>
      </div>
      <StartBtn />
    </div>
  );
}
