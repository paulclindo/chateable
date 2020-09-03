import React from "react";
import { auth, db } from "../services/firebase";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
const LayoutChat = styled.div`
  /* height: 100vh; */
  padding: 0 0 100px;
`;
const ChatCard = styled.div`
  background: #e5e5e5;
  color: #333;
  padding: 0.4em 5em;
  border-radius: 8px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 14px;
  span {
    color: #3dc456;
  }
`;

const FormInput = styled.form`
  position: fixed;
  border-top: 1px solid #333;
  bottom: 0;
  /* height: 100px; */
  left: 0;
  right: 0;
  background: #333;
  color: white;
  display: flex;
  input {
    flex: 3;
    padding: 20px 30px;
    border: none;
  }
  & > * {
    border: none;
    flex: 1;
  }
  button {
    background: #333;
    color: #e5e5e5;
  }
`;

function ChatContainer() {
  const [data, setData] = useState({
    user: auth().currentUser,
    chats: [],
    content: "",
    readError: null,
    writeError: null,
    error: null,
  });

  useEffect(() => {
    try {
      const ref = db.ref("chats").orderByKey().limitToLast(100);
      const listener = ref.on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setData({ ...data, chats });
      });
      return () => ref.off("value", listener);
    } catch (error) {
      setData({ ...data, readError: error.message });
    }
  }, [data, setData]);

  const handleChange = (event) => {
    setData({ ...data, content: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ data });
    const sendData = async () => {
      try {
        await db.ref("chats").push({
          message: data.content,
          timestamp: Date.now(),
          uid: data.user.uid,
        });
        setData({ ...data, content: "" });
      } catch (error) {
        setData({ ...data, writeError: error.message });
      }
    };
    sendData();
  };

  return (
    <LayoutChat>
      <h1>Welcome to Chat Live Preview</h1>
      <div>
        <div className="chats">
          {data.chats.map((chat) => (
            <ChatCard>
              <span>{chat.uid}</span>
              <span>{new Date(chat.timestamp).toLocaleString()}</span>
              <p key={chat.timestamp}>{chat.message}</p>
            </ChatCard>
          ))}
        </div>
        <FormInput onSubmit={handleSubmit}>
          <input
            placeholder="Insert here .."
            onChange={handleChange}
            value={data.content}
          />
          {data.error ? <p>{data.writeError}</p> : null}
          <button type="submit">Send</button>
        </FormInput>
        <div>
          Login in as: <strong>{data.user.email}</strong>
        </div>
      </div>
    </LayoutChat>
  );
}

export default ChatContainer;
