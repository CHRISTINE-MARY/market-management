import React, { createContext, useContext, useState } from 'react';

// Create the context
const MessageContext = createContext();

// Create a provider component
export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    const updateMessage = (newMessage) => {
        setMessage(newMessage);
        setTimeout(() => {
            setMessage('');
        }, 5000); // Clear the message after 5 seconds
    };

    return (
        <MessageContext.Provider value={{ message, updateMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

// Custom hook to use the MessageContext
export const useMessage = () => {
    return useContext(MessageContext);
};