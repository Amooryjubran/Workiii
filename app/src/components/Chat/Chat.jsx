import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import useChatStore from "@/store/useChatStore";
import {
  MessageCircle,
  X,
  AlertCircle,
  ChevronLeft,
  Send,
  PlusSquare,
} from "react-feather";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Input from "@/components/Input";
import useUserStore from "@/store/useUserStore";

// Dummy users data with added info field
const usersData = [
  {
    id: 1,
    name: "Alice",
    imageUrl: "https://via.placeholder.com/150",
    message: "Alice's info...",
    date: "10:30 AM",
    messagesToRead: 4,
  },
  {
    id: 2,
    name: "Bob",
    imageUrl: "https://via.placeholder.com/150",
    message: "Bob's info...",
    date: "4:30 AM",
    messagesToRead: null,
  },
  // ... other users
];

// Dummy chat messages data
const chatMessages = {
  1: [
    {
      id: 1,
      text: "Hi there!, My name is omar dsa dasd dsad  ads da OMAR SALEH daslo dpoi hsod hasiludh ",
      sender: "Alice",
      date: "10:00 AM",
      imageUrl: "https://via.placeholder.com/150",
    },
    { id: 2, text: "Hello! How are you?", sender: "You", date: "10:00 AM" },
    {
      id: 3,
      text: "XXXXX!, My name is omar dsa dasd dsad  ads da OMAR SALEH daslo dpoi hsod hasiludh ",
      sender: "Alice",
      date: "10:00 AM",
      imageUrl: "https://via.placeholder.com/150",
    },
    // ... more messages for Alice
  ],
  2: [
    {
      id: 1,
      text: "Hey Bob, are you available tomorrow?",
      sender: "You",
      date: "10:00 AM",
    },
    { id: 2, text: "Yes, what's up?", sender: "Bob", date: "10:00 AM" },
    // ... more messages for Bob
  ],
  // ... other users' messages
};

export default function Chat() {
  const { t } = useTranslation();
  const {
    currentUser,
    isModalOpen,
    showUserInfo,
    openChat,
    closeChat,
    toggleUserInfo,
    isChatModalOpen,
    defaultChatModal,
    resetChatModal,
  } = useChatStore();

  // Generate the class name based on the isChatModalOpen state
  const chatContainerClassName = isChatModalOpen
    ? `${styles.chatContainer} ${styles.chatContainerVisible}`
    : `${styles.chatContainer} ${styles.chatContainerHidden}`;
  if (!isChatModalOpen) {
    return (
      <Button className={styles.chatWrapper} onClick={defaultChatModal}>
        <MessageCircle color="black" />
      </Button>
    );
  }

  if (isModalOpen) {
    return (
      <div className={chatContainerClassName}>
        <Modal
          user={currentUser}
          onClose={closeChat}
          onToggleUserInfo={toggleUserInfo}
          showUserInfo={showUserInfo}
          messages={chatMessages[currentUser.id]}
        />
      </div>
    );
  }
  return (
    <div className={chatContainerClassName}>
      <div className={styles.usersListContainer}>
        <Button onClick={resetChatModal} className={styles.resetBtn}>
          <X />
        </Button>
        <span className={styles.chatTitle}>{t("dashboard.Chat")}</span>
        <div />
      </div>
      <UserList users={usersData} onUserClick={openChat} />
    </div>
  );
}

function UserList({ users, onUserClick }) {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <div
          key={user.id}
          className={styles.userListItem}
          onClick={() => onUserClick(user)}
        >
          <img
            src={user.imageUrl}
            alt={user.name}
            className={styles.userImage}
          />
          <div className={styles.userListItemInfo}>
            <h1>{user.name}</h1>
            <span>{user.message}</span>
          </div>
          <div className={styles.userListItemInfoDates}>
            <span>{user.date}</span>
            {user.messagesToRead ? (
              <div className={styles.messagesToRead}>{user.messagesToRead}</div>
            ) : (
              <div />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Modal({ user, onClose, onToggleUserInfo, showUserInfo, messages }) {
  const chatAreaRef = useRef(null);
  const [messagesData, setMessagesData] = useState(messages || []);
  const [newMessage, setNewMessage] = useState("");
  const { user: currentUser } = useUserStore();

  useEffect(() => {
    setTimeout(() => {
      const lastMessageElement = chatAreaRef.current?.lastChild;
      lastMessageElement?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    console.log(newMessage);
    if (newMessage.trim() === "") return;

    let time = new Date();
    const newMessageData = {
      id: messagesData.length + 1,
      text: newMessage,
      sender: "You",
      date: time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      imageUrl: currentUser?.profileImg || null,
    };
    setMessagesData([...messagesData, newMessageData]);
    setNewMessage("");
    // Scroll to the bottom of the chat area
    setTimeout(() => {
      const lastMessageElement = chatAreaRef.current?.lastChild;
      lastMessageElement?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <button className={styles.userModalBtn} onClick={onClose}>
          <ChevronLeft />
        </button>
        <div>
          <img
            src={user.imageUrl}
            alt={user.name}
            className={styles.userImageModal}
          />
          <h1 className={styles.chatTitle}>{user.name}</h1>
        </div>
        {showUserInfo ? (
          <div />
        ) : (
          <Button onClick={onToggleUserInfo} className={styles.userModalBtn}>
            <AlertCircle color="purple" />
          </Button>
        )}
      </div>
      {showUserInfo ? (
        <div className={styles.userInfo}>
          <p>{user.info}</p>
        </div>
      ) : (
        <div className={styles.chatArea} ref={chatAreaRef}>
          {messagesData &&
            messagesData.map((message) => (
              <div
                key={message.id}
                className={
                  message.sender === "You"
                    ? `${styles.message} ${styles.messageFromYou}`
                    : styles.message
                }
              >
                {message.sender !== "You" && (
                  <Image
                    classNameWrapper={styles.senderImage}
                    src={message.imageUrl}
                  />
                )}
                <div className={styles.messageSenderContainer}>
                  {message.sender !== "You" && (
                    <span className={styles.messageSender}>
                      {message.sender}
                    </span>
                  )}
                  <div className={styles.messageText}>{message.text}</div>
                </div>
                <div className={styles.messageDate}>{message.date}</div>
              </div>
            ))}
        </div>
      )}
      {!showUserInfo && (
        <div className={styles.inputArea}>
          <div className={styles.inputAreaWrapper}>
            <Input
              type="text"
              placeholder="Type a message..."
              className={styles.inputField}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button className={styles.uploadImgBtn}>
              <PlusSquare color="purple" size={20} />
            </Button>
          </div>
          <Button className={styles.sendButton} onClick={handleSendMessage}>
            <Send color="purple" />
          </Button>
        </div>
      )}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
};

Modal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    info: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onToggleUserInfo: PropTypes.func.isRequired,
  showUserInfo: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    })
  ),
};
