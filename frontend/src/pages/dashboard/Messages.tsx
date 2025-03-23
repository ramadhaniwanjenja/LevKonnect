import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Conversation {
  id: number;
  projectId?: number;
  projectTitle?: string;
  with: {
    id: number;
    name: string;
    avatar?: string;
    isOnline: boolean;
    userType: 'client' | 'engineer';
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
  };
  unreadCount: number;
}

interface Message {
  id: number;
  sender: 'self' | 'other';
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
}

const Messages: React.FC = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  const [userType] = useState<'client' | 'engineer'>('engineer'); // In a real app, this would come from auth context
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate API call to fetch conversations
    setTimeout(() => {
      const mockConversations: Conversation[] = [
        {
          id: 1,
          projectId: 101,
          projectTitle: "Solar Panel Installation for Rural School",
          with: {
            id: 201,
            name: "Education Ministry",
            isOnline: true,
            userType: 'client'
          },
          lastMessage: {
            content: "Can you provide an update on the installation progress?",
            timestamp: "2025-03-07T15:30:00",
            isRead: false
          },
          unreadCount: 2
        },
        {
          id: 2,
          projectId: 102,
          projectTitle: "Wind Turbine Maintenance",
          with: {
            id: 202,
            name: "Green Energy Tanzania",
            isOnline: false,
            userType: 'client'
          },
          lastMessage: {
            content: "The project starts next week. Please confirm your availability.",
            timestamp: "2025-03-06T09:15:00",
            isRead: true
          },
          unreadCount: 0
        },
        {
          id: 3,
          with: {
            id: 203,
            name: "James Mwangi",
            isOnline: false,
            userType: 'client'
          },
          lastMessage: {
            content: "I'm interested in your services. Can we discuss a potential project?",
            timestamp: "2025-03-05T14:20:00",
            isRead: true
          },
          unreadCount: 0
        }
      ];
      
      setConversations(mockConversations);
      
      // If projectId is provided in URL, select that conversation
      if (projectId) {
        const conversation = mockConversations.find(c => c.projectId === parseInt(projectId));
        if (conversation) {
          setSelectedConversation(conversation);
          fetchMessages(conversation.id);
        }
      }
      
      setIsLoading(false);
    }, 1000);
  }, [projectId]);
  
  const fetchMessages = (conversationId: number) => {
    setIsLoading(true);
    
    // Simulate API call to fetch messages for selected conversation
    setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: 1,
          sender: 'other',
          content: "Hello! I'm interested in hiring you for a solar panel installation project.",
          timestamp: "2025-03-05T10:30:00",
          isRead: true
        },
        {
          id: 2,
          sender: 'self',
          content: "Hi there! Thank you for reaching out. I'd be happy to discuss the project details.",
          timestamp: "2025-03-05T10:32:00",
          isRead: true
        },
        {
          id: 3,
          sender: 'other',
          content: "Great! It's for a rural school in Dodoma. We need a 5kW system with battery backup.",
          timestamp: "2025-03-05T10:35:00",
          isRead: true
        },
        {
          id: 4,
          sender: 'self',
          content: "I have experience with similar projects. Could you share more details about the location and timeline?",
          timestamp: "2025-03-05T10:40:00",
          isRead: true
        },
        {
          id: 5,
          sender: 'other',
          content: "Sure, the school is located about 20km from Dodoma city center. We'd like to complete the installation within two weeks if possible.",
          timestamp: "2025-03-05T10:45:00",
          isRead: true
        },
        {
          id: 6,
          sender: 'other',
          content: "I've attached some photos of the site and our requirements document.",
          timestamp: "2025-03-05T10:46:00",
          isRead: true,
          attachments: [
            {
              name: "site_photos.zip",
              url: "#",
              type: "application/zip",
              size: "12.5 MB"
            },
            {
              name: "requirements.pdf",
              url: "#",
              type: "application/pdf",
              size: "2.3 MB"
            }
          ]
        },
        {
          id: 7,
          sender: 'self',
          content: "Thank you for the information. I'll review these documents and get back to you with a proposal by tomorrow.",
          timestamp: "2025-03-05T11:00:00",
          isRead: true
        },
        {
          id: 8,
          sender: 'other',
          content: "That sounds great. Looking forward to your proposal!",
          timestamp: "2025-03-05T11:02:00",
          isRead: true
        },
        {
          id: 9,
          sender: 'self',
          content: "I've submitted my proposal through the platform. Please let me know if you have any questions.",
          timestamp: "2025-03-06T09:15:00",
          isRead: true
        },
        {
          id: 10,
          sender: 'other',
          content: "We've reviewed your proposal and would like to proceed. Can you start next week?",
          timestamp: "2025-03-07T15:28:00",
          isRead: false
        },
        {
          id: 11,
          sender: 'other',
          content: "Can you provide an update on the installation progress?",
          timestamp: "2025-03-07T15:30:00",
          isRead: false
        }
      ];
      
      setMessages(mockMessages);
      setIsLoading(false);
      
      // Mark conversation as read when opened
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } } 
            : conv
        )
      );
      
      // Scroll to bottom of messages
      scrollToBottom();
    }, 800);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    setIsSending(true);
    
    // Simulate sending message to API
    setTimeout(() => {
      const newMsg: Message = {
        id: Date.now(),
        sender: 'self',
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      setIsSending(false);
      
      // Update conversation last message
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === selectedConversation.id 
            ? { 
                ...conv, 
                lastMessage: {
                  content: newMessage,
                  timestamp: new Date().toISOString(),
                  isRead: true
                } 
              } 
            : conv
        )
      );
      
      // Scroll to bottom of messages
      scrollToBottom();
    }, 500);
  };
  
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatConversationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col pt-18">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType={userType} />
        
        <main className="flex-grow flex overflow-hidden">
          <div className="flex-grow flex flex-col md:flex-row">
            {/* Conversations list */}
            <div className="w-full md:w-80 border-r border-gray-200 bg-white">
              <div className="h-16 flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg text-gray-800">Messages</h2>
              </div>
              
              {isLoading && conversations.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No conversations yet</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
                  {conversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        fetchMessages(conversation.id);
                      }}
                      className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                        selectedConversation?.id === conversation.id ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="relative mr-3">
                          {conversation.with.avatar ? (
                            <img 
                              src={conversation.with.avatar} 
                              alt={conversation.with.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                              {conversation.with.name.charAt(0)}
                            </div>
                          )}
                          {conversation.with.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium text-gray-900 truncate">{conversation.with.name}</h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {formatConversationTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          
                          {conversation.projectTitle && (
                            <p className="text-xs text-green-600 mb-1 truncate">
                              {conversation.projectTitle}
                            </p>
                          )}
                          
                          <p className={`text-sm truncate ${
                            conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'
                          }`}>
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                        
                        {conversation.unreadCount > 0 && (
                          <div className="ml-2 bg-green-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Message area */}
            <div className="flex-grow flex flex-col bg-white">
              {!selectedConversation ? (
                <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50">
                  <div className="w-16 h-16 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Your Messages</h3>
                  <p className="text-gray-500 text-center mb-6">Select a conversation to view messages</p>
                </div>
              ) : (
                <>
                  {/* Conversation header */}
                  <div className="h-16 flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        {selectedConversation.with.avatar ? (
                          <img 
                            src={selectedConversation.with.avatar} 
                            alt={selectedConversation.with.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                            {selectedConversation.with.name.charAt(0)}
                          </div>
                        )}
                        {selectedConversation.with.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedConversation.with.name}</h3>
                        {selectedConversation.projectTitle && (
                          <Link to={`/projects/${selectedConversation.projectId}`} className="text-xs text-green-600 hover:underline">
                            {selectedConversation.projectTitle}
                          </Link>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>No messages yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map(message => (
                          <div key={message.id} className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] ${
                              message.sender === 'self' 
                                ? 'bg-green-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                                : 'bg-white border border-gray-200 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                            } p-3 shadow-sm`}>
                              <div className="text-sm">{message.content}</div>
                              
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center p-2 bg-gray-100 bg-opacity-20 rounded">
                                      <div className="mr-2">
                                        {attachment.type.includes('image') ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                        ) : attachment.type.includes('pdf') ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                          </svg>
                                        ) : (
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                          </svg>
                                        )}
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <div className="text-xs font-medium truncate">{attachment.name}</div>
                                        <div className="text-xs opacity-70">{attachment.size}</div>
                                      </div>
                                      <a href={attachment.url} className="ml-2 text-xs underline">Download</a>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className={`text-xs mt-1 ${message.sender === 'self' ? 'text-green-200' : 'text-gray-500'}`}>
                                {formatMessageTime(message.timestamp)}
                                {message.sender === 'self' && (
                                  <span className="ml-2">
                                    {message.isRead ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                      </svg>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <button 
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow py-2 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      
                      <button 
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className={`p-2 bg-green-600 text-white rounded-full ${
                          !newMessage.trim() || isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                        }`}
                      >
                        {isSending ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Messages;