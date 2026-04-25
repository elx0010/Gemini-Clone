import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context.jsx'

const Main = () => {
  const { input, setInput, onSent, recentPrompt, resultData, loading, showResult } = useContext(Context);

  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult
            ? <>
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning")}>
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => onSent("Brainstorm team bonding activities for out work retreat")}>
                        <p>Brainstorm team bonding activities for out work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => onSent("Improve the readability fo the following code")}>
                        <p>Improve the readability fo the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
            </>
            : <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                        ? <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        : <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                    }
                </div>
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="Enter a prompt here"
                        onKeyDown={(e) => e.key === 'Enter' && input && onSent(input)}
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={() => onSent(input)} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses.
                     Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main