import React, { useEffect, useRef, useState } from "react";
import ChatUser from "../Components/ChatUser";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import UserChatLabel from "./../Components/UserChatLabel";
import ChatMessage from "./../Components/ChatMessage";
import UserChatInput from "./../Components/UserChatInput";
import { getRequest, postRequest } from "../serviceCalls";
const socket = io.connect("https://khoj--server.herokuapp.com");

const Chat = () => {
  const [userId, setUserId] = useState(localStorage.getItem("khojUser"));
  const [postedBy, setPostedBy] = useState("");
  const location = useLocation();

  const [currentChatMsgs, setCurrentChatMsgs] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const [roomsId, setRoomsId] = useState([]);
  useEffect(() => {
    socket.on("message", (message) => {
      let tempArr = [...currentChatMsgs, message];
      setCurrentChatMsgs(tempArr);
    });
    return () => {
      socket.off("message");
    };
  }, [currentChatMsgs]);

  useEffect(async () => {
    if (location?.state?.postedBy && userId !== location?.state?.postedBy) {
      await getRequest(
        `/chats/create-chat?user2=${location.state.postedBy}`
      ).then((chat) => {
        let currChat = chat?.chat;
        setCurrentChatId(location?.state?.postedBy);
        let currChatObj = {};
        if (userId == currChat.user1) {
          currChatObj["id"] = currChat.user2;
          currChatObj["userName"] = currChat.userName2;
          currChatObj["roomId"] = currChat.roomId;
        } else if (userId == currChat.user2) {
          currChatObj["id"] = currChat.user1;
          currChatObj["userName"] = currChat.userName1;
          currChatObj["roomId"] = currChat.roomId;
        }
        setCurrentChat(currChatObj);
        if (currChat._id) {
          // window.location.reload();
          navigate("/chat", {
            state: {
              postedBy: "",
            },
          });
        }
      });
    }
  }, [location]);
  const divRef = useRef(null);
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };
  useEffect(async () => {
    setUserId(localStorage.getItem("khojUser"));
    const chatS = await getRequest("/chats/get-chats-of-user");
    if (chatS.chats) setChats(chatS.chats);

    let chatArray = [];
    if (chatS.chats) {
      for (let i in chatS.chats) {
        let chat = chatS.chats[i];
        setRoomsId([...roomsId, chat.roomId]);
        if (chat.user1 == userId) {
          chatArray.push({
            id: chat.user2,
            name: chat.user2Name,
            roomId: chat.roomId,
            userName: chat.userName2,
          });
        } else
          chatArray.push({
            id: chat.user1,
            name: chat.user1Name,
            roomId: chat.roomId,
            userName: chat.userName1,
          });
      }
      setChats(chatArray);
      // // console.log(chats);
    } else {
      // console.log("error no chats");
    }

    if (chats[0]?.id) {
      setCurrentChatId(chats[0]?.id);
      setCurrentChat(chats[0]);
    }
  }, []);

  useEffect(async () => {
    // setCurrentChatMsgs([]);
    const getMessages = async () => {
      // // console.log(typeof currentChatId, currentChatId);
      await getRequest(
        `/messages/get-of-current-user?user2=${currentChatId}`
      ).then((msgs) => {
        setCurrentChatMsgs(msgs.messages);
        // console.log(msgs);
        // console.log("currChatMsgs ", currentChatMsgs);
      });
      // if (messages.length > 0) // console.log(messages, "messages ");
      // if (messages) {
      //   setCurrentChatMsgs(messages.messages);
      //   // console.log(messages);
      // }
    };
    if (currentChatId != "") await getMessages();
    if (currentChat) {
      socket.emit("join-room", currentChat.roomId);
    }
  }, [currentChatId]);
  const [messages, setMessages] = useState([]);

  const sendMessage = async (messageText) => {
    // console.log("here");
    const msgData = {
      roomId: currentChat.roomId,
      sentBy: userId,
      receivedBy: currentChatId,
      text: messageText,
      date: Date.now(),
    };
    // alert(messageText);
    socket.emit("send-message", msgData);
    const { data } = postRequest("/messages/send-message", {
      ...msgData,
      message: messageText | "",
    });
    // .then((data) => console.log(data, "msg sent"));
    // // console.log(await data);
    // if (data) // console.log(data);
    scrollToBottom();
  };
  // socket.on("message", (data) => {
  //   // console.log(messages);
  //   alert(data.text);
  //   // setMessages([...messages, data]);
  // });

  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("khojUserToken");
    if (!token) navigate("/login");
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-container-left-div">
        {/* {currentChatMsgs.length} */}
        <div className="chats-label h-100px">Chats</div>
        {chats?.length == 0 ? (
          <div className="text-center my-5">No chats Found</div>
        ) : (
          <div className="mt-1">
            {chats?.map((chat) => (
              <div
                onClick={(e) => {
                  setCurrentChat(chat);
                  // // console.log("new chat ", chat);
                  setCurrentChatId(chat.id);
                }}
                role="button"
              >
                {" "}
                <ChatUser
                  chat={chat}
                  isCurrentUser={currentChatId == chat.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chat-container-right-div ">
        {chats?.length ? (
          currentChatId && currentChat ? (
            <div>
              {currentChat && <UserChatLabel chat={currentChat} />}
              {currentChatMsgs.length ? (
                <div
                  ref={divRef}
                  className="control-overflow width-100 w-100 msgBox m-1"
                >
                  {currentChatMsgs &&
                    currentChatMsgs.map((msg) => (
                      <>
                        <ChatMessage msg={msg} userId={userId} />
                      </>
                    ))}
                </div>
              ) : (
                <div className="start-msging vertical-align-middle">
                  Start Messaging!
                </div>
              )}
              <UserChatInput sendMessage={sendMessage} />
            </div>
          ) : (
            <div className="vertical-align-middle h-100 mx-auto">
              Select a Chat to Start Messaging
            </div>
          )
        ) : (
          <div className="text-center  vertical-align-middle h-100">
            Make a new chat to see Chats!
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
