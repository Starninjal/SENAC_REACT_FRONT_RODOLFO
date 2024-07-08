import { useEffect, useState } from "react"
import ChatBotProps from "../../interfaces/ChatBotProps";
import { fetchChatBotConversation } from "../../services/ChatBotAPI";
import './ChatBot.css';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import { Typography } from "@mui/material";

const SACComponent = () => {
    const [conversation, setChatBotApi] = useState<ChatBotProps | null>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [showChatBox, setShowChatBox] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [menuHidden, setMenuHidden] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        const chatData = fetchChatBotConversation();
        setChatBotApi(chatData);
    }, [])

    const handleButtonClick = () => {
        if (conversation) {
            const nextIndex = (currentMessageIndex + 1) % conversation.message.length;
            setCurrentMessageIndex(nextIndex);
            setMessages((prevMessages) => [...prevMessages, conversation.message[nextIndex]]);  
            setConsoleLogChatMessage(nextIndex);
            console.log(nextIndex);
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, `Você: ${inputMessage}`]);
            setInputMessage('');
            handleButtonClick();
        }
    };

    const handleFAQClick = () => {
        navigate('/FAQ');
    };
    
    const handleContactClick = () => {
        navigate('/Contact')
    }

    const setConsoleLogChatMessage = (nextIndex: number) => {
        console.log(conversation?.message[nextIndex])
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const handleChatbotClick = () => {
        setShowChatBox(!showChatBox);
        setMenuHidden(true);
    };

    const handleChatboxClose = () => {
        setShowChatBox(false);
        setMenuHidden(false);
    };

    const actions = [
        { icon: <ChatIcon />, name: 'Chatbot', onClick: handleChatbotClick },
        { icon: <HelpIcon />, name: 'FAQ', onClick: handleFAQClick },
        { icon: <ContactSupportIcon />, name: 'Contato', onClick: handleContactClick},
    ];

    return(
        <>
        <div className="chatbot-container">
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={`floating-menu ${menuHidden ? 'floating-menu-hidden' : ''}`}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="up"
                FabProps={{ sx: { width: 60, height: 60 } }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                       
                    />
                ))}
            </SpeedDial>

         
            {showChatBox && (
                <Box className="chatbox" sx={{ width: 500, height: 500, position: 'absolute', bottom: 100, right: 20, border: '1px solid #ccc', borderRadius: 4, boxShadow: 3, backgroundColor: 'white' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #ccc' }}>
                        <Typography variant="h6">Chatbot</Typography>
                        <IconButton onClick={handleChatboxClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px - 48px)' }}>
                        {messages.map((message, index) => (
                            <p key={index} className={message.startsWith('Você:') ? 'user-message' : 'bot-message'}>{message}</p>
                        ))}
                    </Box>
                    <Box sx={{ p: 1, borderTop: '1px solid #ccc', display: 'flex' }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Escreva sua mensagem"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
                        />
                        <Button variant="contained" sx={{ ml: 1 }} onClick={handleSendMessage}>Enviar</Button>
                    </Box>
                </Box>
            )}
        </div>
        </>
    )
}

export default SACComponent;