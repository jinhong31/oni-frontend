import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import logo from "./../assets/logo.webp";
const baseURL = "http://localhost:5000/getTotalData";
// eslint-disable-next-lines
const Interface = () => {
  const [refetch, setRefetch] = useState(true);
  const [tradingState, setTradingState] = useState(false);
  const [jeetState, setJeetState] = useState(false);
  const [jeetPreventTime, setJeetProventTime] = useState(0);
  const [countTime, setCountTime] = useState(0);
  // const [counterTime, setCounterTime] = useState(0);
  const [timer, setTimer] = useState('00:00');


  useEffect(() => {
    setInterval(() => {
      setRefetch((prevRefetch) => {
        return !prevRefetch;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const jeetTimer = async () => {
      if (jeetState) return;
      startTimer(countTime);
    }
    jeetTimer();
  }, [refetch])

  useEffect(() => {
    const getData = async () => {
      const _data = await axios.get(baseURL);
      if(tradingState !== _data.data.tradingState) {
        setTradingState(_data.data.tradingState);
      }

      if(jeetState !== _data.data.jeetState) {
        setJeetState(_data.data.jeetState);
      }

      if(!jeetState && countTime !== _data.data.countTime) {
        setCountTime(_data.data.countTime);
      }
    }
    getData();
  }, [refetch])

  const getTimeRemaining = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000) / 60);
    return {
      minutes, seconds
    };
  }

  const startTimer = (time) => {
    let { minutes, seconds }
      = getTimeRemaining(time);
    if (time >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  return (
    <>
      <br />
      <div className="container" style={{ textAlign: "center" }}>
        <img src={logo} className="logo-img" />
        <br />
        <br />
        <br />
        <div className="social-icons">
          <div className="col-md-4">
            <a className="elementor-icon" href="https://t.me/JeetDemon" target="_blank" style={{ textDecoration: "none" }}>
              <i aria-hidden="true" className="fa fa-telegram"></i>
            </a>
          </div>
          <div className="col-md-4">
            <a className="elementor-icon" href="https://twitter.com/Naita_Aka_Oni" target="_blank" style={{ textDecoration: "none" }}>
              <i aria-hidden="true" className="fa fa-twitter"></i>
            </a>
          </div>
          <div className="col-md-4">
            <a className="elementor-icon" href="https://medium.com/@jeetdemon/pump-dump-no-more-with-the-new-eth-2-0-anti-jeet-erc20-standard-19fe0862d724" target="_blank" style={{ textDecoration: "none" }}>
              <i aria-hidden="true" className="fa fa-medium"></i>
            </a>
          </div>
        </div>
        <br />
        <br />
        <h2 className="elementor-heading-title elementor-size-default">Website Opening Soon</h2>
      </div>

      <div style={{ textAlign: "center" }}>
        <div className="state-content">
          <div className={`state-icon ${tradingState ? jeetState ? "active-icon" : "inactive-icon" : "before-icon"}`} />
          <div className="state-div">
            {tradingState ? jeetState ? <p className="state-statement">Active Selling!</p> : <p className="state-error">Stop Selling!</p> : <p className="state-statement">Coming Soon!</p>}
          </div>
        </div>
        <div className="count-down">
          {(tradingState && !jeetState) ? (
            <h2>{timer}</h2>
          ) : ""}
        </div>
      </div>

    </>
  );
}

export default Interface;
