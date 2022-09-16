import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import logo from "./../assets/logo.webp";
const baseURL = "https://oni-backend.vercel.app/getTotalData";
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
      // setCountTime(countTime - 1)
      startTimer(countTime);
    }
    jeetTimer();
  }, [refetch])

  useEffect(() => {
    const getData = async () => {
      const _data = await axios.get(baseURL);
      if (tradingState !== _data.data.tradingState) {
        setTradingState(_data.data.tradingState);
      }

      if (jeetState !== _data.data.jeetState) {
        setJeetState(_data.data.jeetState);
      }

      if (!jeetState) {
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

        <div style={{ textAlign: "center" }}>

          <div className="state-content">
            <div className={`state-icon ${jeetState ? "zoom-in-out-circle": ""} ${tradingState ? jeetState? "background-green zoom-in-out-circle" : "background-green" : "background-yellow zoom-in-out-circle"}`} />
            <div className="state-div">
              {tradingState ? (
                <>
                  <p className="state-statement green font-size-35">Trading Is</p>
                  <p className="state-statement green font-size-35"> Currently Active!</p>
                </>
              ) : <p className="state-statement">Coming Soon!</p>}
            </div>
          </div>
          <br />
          <div className="state-content">
            <div className={`state-icon background-red ${tradingState && !jeetState ? "zoom-in-out-circle" : ""}`}/>
            <div className="state-div">
              <p className="state-statement red font-size-27">Trading Is Temporarily</p><p className="state-statement red font-size-27"> Disabled For:</p>
              <div className="count-down">
                <h2>{timer}</h2>
              </div>
            </div>
          </div>
          <br />
        </div>
        <div className="elementor-title-div">
          <h2 className="elementor-title">If and only if there are to be exactly <font className="red bold">6 sell transactions</font> that occur within no more than <font className="green bold">3 minutes</font> of each other, selling for all holders will be completely disabled for <font class="red bold">9 minutes</font>. After 9 minutes, <font className="green bold">selling will be allowed</font> again, and thus, the cycle will continue <font className="bold">automatically</font> and <font className="bold">autonomously</font>.</h2>
        </div>
        <iframe loading="lazy" border="0" style={{ border: "none", borderRadius: "12px", overflow: "hidden", maxWidth: "100%", maxHeight: "760px" }} scrolling="no" src="https://app.uniswap.org/#/swap?theme=dark&amp;use=v2&amp;slippage=10.00&amp;inputCurrency=ETH&amp;outputCurrency=0x0000000" width="1200" height="720"></iframe>
        <h2 className="elementor-heading-title elementor-size-default">Join The $ONI Community:</h2>
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
      </div>
    </>
  );
}

export default Interface;
