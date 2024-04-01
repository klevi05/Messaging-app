import React, { useEffect, useRef, useState } from 'react';

function Chats(){
    const divRef = useRef(null);
    const [val] = useState()
    const message = e => {
        console.log(e.target.value)
    }
    useEffect(() => {
        const divElement = divRef.current;
        divElement.scrollTop = divElement.scrollHeight;
    })
    return(
        <div className="chats">
            <div className="chat" ref={divRef}>
                <div className='invisibleOwnMessages'>
                    <div className="ownMessagesDiv">
                        <p className="ownMessages">Hellooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                </div>
                <div className='invisibleOtherMessages'>
                    <div className="otherMessagesDiv">
                        <p className="othersMessages">hello</p>
                    </div>
                </div>
                <div className='invisibleOwnMessages'>
                    <div className="ownMessagesDiv">
                        <p className="ownMessages">Hellaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                </div>
                <div className='invisibleOtherMessages'>
                    <div className="otherMessagesDiv">
                        <p className="othersMessages">hello</p>
                    </div>
                </div>
                <div className='invisibleOwnMessages'>
                    <div className="ownMessagesDiv">
                        <p className="ownMessages">Hellooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                </div>
                <div className='invisibleOtherMessages'>
                    <div className="otherMessagesDiv">
                        <p className="othersMessages">hello</p>
                    </div>
                </div>
                <div className='invisibleOwnMessages'>
                    <div className="ownMessagesDiv">
                        <p className="ownMessages">Hellooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                </div>
                <div className='invisibleOtherMessages'>
                    <div className="otherMessagesDiv">
                        <p className="othersMessages">hello</p>
                    </div>
                </div>  
            </div>
            <div className="textBox">
                <div className="textarea">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" no-resize onChange={message} value={val}></textarea>
                </div>
                <form className="send">
                <button className="button" type="submit" value="submit"><svg xmlns="http://www.w3.org/2000/svg" fill="rgb(4, 137, 193)" className="bi bi-cursor-fill" viewBox="0 0 16 16">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                </svg>
                </button>
                </form>
            </div>
        </div>
    )
}

export default Chats;