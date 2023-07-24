import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "quill-mention";
import * as Emoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "./chat.component.styles.scss";
import Microlink from "@microlink/react";
Quill.register("modules/emoji", Emoji);
let a;
const ChatComponent = ({
  selectedChat,
  socket,
  messages,
  activeUsers,
  receivedFile,
}) => {
  const [value, setValue] = useState("");
  const [mentionList, setMentionList] = useState([]);
  const quillRef = useRef(null);
  const [fileUp, setFileUp] = useState(false);
  const [file, setFile] = useState(null);
  const [Link, setLink] = useState({ hasLink: false, href: "" });
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    setMentionList(
      activeUsers.map((user, index) => ({ id: index, value: user[1] }))
    );
  }, [activeUsers]);

  useEffect(() => {
    a = mentionList;
  }, [mentionList]);

  const handleMentionButtonClick = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const selection = quill.getSelection();

      if (selection) {
        const startPos = selection.index;
        const endPos = selection.index + selection.length;

        quill.insertText(startPos, "@"); // Insert "@" at the current cursor position

        // Update the selection to highlight the "@" mention
        quill.setSelection(startPos + 1, endPos + 1);
      }
    }
  };

  const messagesSubmitHandler = (e) => {
    e.preventDefault();

    if (value) {
      socket.emit(
        "privateMessage",
        JSON.stringify({
          recipientId: selectedChat[0],
          message: value,
          senderId: socket.id,
          timestamp: Date.now(),
          messageID: Math.random().toString(36).substring(2, 8),
          link: Link,
          type: "message",
        })
      );
      console.log("messages sent");
      setValue("");
    }
  };

  const msgHtmler = (e, recipientId) => {
    return (
      <div className={`${socket.id === recipientId ? "" : "senderChat"}`}>
        {" "}
        <div
          className={`chatleaf ${
            socket.id === recipientId ? "receiver" : "sender"
          }`}
        >
          {" "}
          <div dangerouslySetInnerHTML={{ __html: e }} />{" "}
        </div>{" "}
      </div>
    );
  };

  const handleFileSend = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result.split(",")[1];
      const data = {
        fileName: file.name,
        senderId: socket.id,
        recipientId: selectedChat[0],
        type: "File",
        fileData,
      };
      socket.emit("file", data);
    };
    reader.readAsDataURL(file);
  };

  const fileUpClik = () => {
    setFileUp((prev) => {
      console.log(prev);
      return !prev;
    });
  };

  const extractLink = (content) => {
    const linkRegex = /<a href="(.*?)"/;
    const match = content.match(linkRegex);
    return match ? match[1] : null;
  };
  const hasWebLink = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const links = tempDiv.getElementsByTagName("a");
    return links.length > 0;
  };
  // Function to handle content change
  const handleContentChange = (content) => {
    setLink({ hasLink: hasWebLink(content), href: extractLink(content) });
    setValue(content);
  };

  return (
    <div>
      {selectedChat.length ? (
        <div>
          <div className="chat-container">
            {messages.length ? (
              messages.map((elem) => {
                if (elem.type === "message") {
                  if (!elem.link.hasLink) {
                    return msgHtmler(elem.message, elem.recipientId);
                  } else if (elem.link.hasLink) {
                    return (
                      <div
                        className={`${
                          socket.id === elem.recipientId ? "" : "senderChat"
                        }`}
                      >
                        {" "}
                        <div
                          className={`chatleaf ${
                            socket.id === elem.recipientId
                              ? "receiver"
                              : "sender"
                          }`}
                        >
                          {" "}
                          <Microlink url={elem.link.href} size="large" />
                        </div>{" "}
                      </div>
                    );
                  }
                } else if (elem.type === "File") {
                  return msgHtmler(
                    `<h3>Received File:</h3>
                  <p>File Name: ${receivedFile.fileName}</p>
                  <a href=${`data:application/octet-stream;base64,${receivedFile.fileData}`} download>
                    Download File
                  </a>`,
                    elem.recipientId
                  );
                }
              })
            ) : (
              <p>No mess</p>
            )}
          </div>

          <ReactQuill
            theme="snow"
            value={value}
            onChange={handleContentChange}
            modules={modules}
            ref={quillRef}
          />

          <button
            type="submit"
            onClick={messagesSubmitHandler}
            className="Sendbtn"
          >
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
          <button
            type="button"
            onClick={handleMentionButtonClick}
            className="MentionButton"
          >
            <span>@</span>
          </button>
          <button onClick={fileUpClik} className="MentionButton">
            <span>+</span>
          </button>
          {fileUp ? (
            <div className="file-inputs">
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleFileSend}>Send File</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>please Select a chat</>
      )}
    </div>
  );
};

const modules = {
  toolbar: [
    ["bold", "italic", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["code", "code-block", "mention"],
  ],
  "emoji-toolbar": true,
  "emoji-textarea": true,
  "emoji-shortname": true,
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@"],
    source: function (searchTerm, renderList, mentionChar) {
      let values;

      if (mentionChar === "@") {
        values = a;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    },
  },
};

export default ChatComponent;
