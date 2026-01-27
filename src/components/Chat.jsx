import { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane, FaUser, FaCheck, FaCheckDouble } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

const API_BASE = "https://dohelp.newhopeindia17.com/api";

const Chat = ({ isOpen, onClose, taskId, taskData }) => {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initConversation = async () => {
    if (!taskDetails || !user) return;

    const myUid = user.user_uid;

    if (!myUid) {
      console.warn("No user_uid found");
      return;
    }

    let receiverId = null;

    // Use user_uid for comparison and receiver determination
    if (taskDetails.helper?.user_uid && taskDetails.helper.user_uid !== myUid) {
      receiverId = taskDetails.helper.user_uid;
    } else if (taskDetails.user?.user_uid && taskDetails.user.user_uid !== myUid) {
      receiverId = taskDetails.user.user_uid;
    }

    if (!receiverId) {
      console.warn("Invalid receiver, chat disabled");
      return;
    }

    const token = sessionStorage.getItem("token");

    const res = await fetch(
      `${API_BASE}/conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver_uid: receiverId, task_id: taskId }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Conversation error:", err);
      return;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      setConversationId(data.conversation_id);
    } else {
      console.error('Server returned non-JSON response for conversation');
    }
  };

  useEffect(() => {
    if (taskId) {
      // Reset state when taskId changes
      setMessages([]);
      setConversationId(null);
      setTaskDetails(null);
      setNewMessage("");
      setShowEmojiPicker(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (isOpen && taskId) {
      fetchTaskDetails();
    }
  }, [isOpen, taskId]);

  useEffect(() => {
    if (taskDetails && !conversationId) {
      initConversation();
    }
  }, [taskDetails]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    if (!user?.user_uid) return;

    const s = io("https://socket.bitmaxgroup.com", {
      path: "/socket.io",
      transports: ["websocket"],
      query: { uid: user.user_uid },
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      setSocketConnected(true);
    });

    s.on("disconnect", () => {
      setSocketConnected(false);
    });

    s.on("receiveMessage", (message) => {
      console.log("Realtime message:", message);
      const normalized = {
        ...message,
        sender_uid: String(message.sender_uid),
      };
      // Only add if it's not from the current user (since sent messages are handled differently)
      if (normalized.sender_uid !== String(user.user_uid)) {
        setMessages(prev => {
          if (prev.some(m => m.id === normalized.id)) return prev;
          return [...prev, normalized];
        });
      }
    });

    s.on("messageSeen", (data) => {
      console.log("Message seen:", data);
      setMessages(prev =>
        prev.map(m =>
          m.id === data.message_id ? { ...m, seen: true } : m
        )
      );
    });

    setSocket(s);

    return () => s.disconnect();
  }, [user?.user_uid]);

  useEffect(() => {
    if (!socket || !conversationId) return;

    const room = `chat_${conversationId}`;
    console.log("Joining room:", room);

    socket.emit("joinRoom", { room });
  }, [socket, conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const fetchMessages = async () => {
    if (!conversationId) return;

    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(
        `${API_BASE}/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
        return;
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        const messagesData = Array.isArray(data) ? data : data.messages;
        const normalizedMessages = messagesData.map(m => ({
          ...m,
          sender_uid: String(m.sender_uid),
        }));
        setMessages(prev => {
          const combined = [...prev];
          normalizedMessages.forEach(msg => {
            if (!combined.some(m => m.id === msg.id)) {
              combined.push(msg);
            }
          });
          return combined;
        });
      } else {
        console.error('Server returned non-JSON response for messages');
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.warn("No authentication token found, using fallback data");
        setTaskDetails({
          user: { id: null, name: "Task Poster", user_uid: "N/A" },
          helper: { id: null, name: "Helper", user_uid: "N/A" }
        });
        return;
      }

      console.log("Fetching task details for taskId:", taskId);

      const response = await fetch(`${API_BASE}/task/${taskId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Task details response status:", response.status);
      console.log("Task details response headers:", Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log("Task details response text (first 500 chars):", text.substring(0, 500));

      // Check if response is HTML (error page) regardless of status
      if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
        console.warn("Received HTML response instead of JSON. API endpoint may not exist. Using fallback data.");
        setTaskDetails({
          user: { id: null, name: taskData?.user_name || "Task Poster", user_uid: taskData?.user_uid || "N/A" },
          helper: { id: null, name: taskData?.helperName || "Helper", user_uid: taskData?.helperUid || "N/A" }
        });
        return;
      }

      if (response.ok) {
        try {
          const data = JSON.parse(text);
          console.log("Parsed task details data:", data);
          if (data.success && data.task) {
            console.log("Setting task details from API:", data.task);
            setTaskDetails(data.task);
          } else {
            console.warn("API returned success=false or no task data, using fallback data:", data);
            setTaskDetails({
              user: { id: null, name: taskData?.user_name || "Task Poster", user_uid: taskData?.user_uid || "N/A" },
              helper: { id: null, name: taskData?.helperName || "Helper", user_uid: taskData?.helperUid || "N/A" }
            });
          }
        } catch (jsonError) {
          console.error("Failed to parse task details JSON:", jsonError.message);
          console.error("Raw response text:", text);
          setTaskDetails({
            user: { id: null, name: taskData?.user_name || "Task Poster", user_uid: taskData?.user_uid || "N/A" },
            helper: { id: null, name: taskData?.helperName || "Helper", user_uid: taskData?.helperUid || "N/A" }
          });
        }
      } else {
        console.warn(`Failed to fetch task details (${response.status} ${response.statusText}), using fallback data`);
        setTaskDetails({
          user: { id: null, name: taskData?.user_name || "Task Poster", user_uid: taskData?.user_uid || "N/A" },
          helper: { id: null, name: taskData?.helperName || "Helper", user_uid: taskData?.helperUid || "N/A" }
        });
      }
    } catch (error) {
      console.error("Error fetching task details:", error.message);
      setTaskDetails({
        user: { id: null, name: taskData?.user_name || "Task Poster", user_uid: taskData?.user_uid || "N/A" },
        helper: { id: null, name: taskData?.helperName || "Helper", user_uid: taskData?.helperUid || "N/A" }
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;

    const token = sessionStorage.getItem("token");

    const res = await fetch(
      `${API_BASE}/message`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: newMessage,
        }),
      }
    );

    if (!res.ok) {
      console.error("Failed to send message");
      return;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      setNewMessage("");

      // Add message to UI immediately
      setMessages(prev => [
        ...prev,
        {
          ...data,
          sender_uid: String(user.user_uid),
        },
      ]);
    } else {
      console.error('Server returned non-JSON response for send message');
    }
  };

  const markSeen = async (id) => {
    const token = sessionStorage.getItem("token");

    await fetch(
      `${API_BASE}/message/${id}/seen`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (authLoading || !user) {
    return null; // ya loader
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 z-50 w-full h-full max-w-md bg-white border-l border-gray-200 shadow-2xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                  <FaUser className="text-lg text-gray-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {(() => {
                      // If from PostedTasks, always show helper info
                      if (taskData?.context === 'postedTasks') {
                        return taskDetails?.helper?.name || taskData?.helperName || "Helper";
                      }
                      // Otherwise, determine based on current user
                      const isPoster = taskDetails?.user?.id === user?.id;
                      if (isPoster) {
                        return taskDetails?.helper?.name || taskData?.helperName || "Helper";
                      } else {
                        return taskDetails?.user?.name || taskData?.user_name || "Task Poster";
                      }
                    })()}
                  </h2>
                  <p className="text-xs text-gray-500">
                    UID: {(() => {
                      // If from PostedTasks, always show helper UID
                      if (taskData?.context === 'postedTasks') {
                        return taskDetails?.helper?.user_uid || taskData?.helperUid || "N/A";
                      }
                      // Otherwise, determine based on current user
                      const isPoster = taskDetails?.user?.id === user?.id;
                      if (isPoster) {
                        return taskDetails?.helper?.user_uid || taskData?.helperUid || "N/A";
                      } else {
                        return taskDetails?.user?.user_uid || taskData?.user_uid || "N/A";
                      }
                    })()}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 transition-colors hover:text-gray-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isOwnMessage = String(message.sender_uid) === String(user?.user_uid);
                  return (
                    <div
                      key={`${message.id}-${message.sender_uid}-${index}`}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          isOwnMessage
                            ? "bg-blue-500 text-white"
                            : message.seen
                            ? "bg-gray-200 text-gray-900"
                            : "bg-gray-200 text-gray-900 border-l-4 border-gray-400 cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!message.seen) {
                            markSeen(message.id);
                            setMessages(prev =>
                              prev.map(m =>
                                m.id === message.id ? { ...m, seen: true } : m
                              )
                            );
                          }
                        }}
                      >
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs opacity-70">
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                          {isOwnMessage && (
                            <div className="flex items-center ml-2">
                              {message.seen ? (
                                <FaCheckDouble className="text-xs opacity-70" />
                              ) : (
                                <FaCheck className="text-xs opacity-70" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {conversationId ? (
              <div className="relative p-4 border-t border-gray-200 bg-gray-50">
                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-2 right-4 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    😊
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 text-dark transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Chat will be available once the task is assigned.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chat;
	