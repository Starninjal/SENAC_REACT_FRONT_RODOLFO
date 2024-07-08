import ChatBotProps from "../interfaces/ChatBotProps"

export const fetchChatBotConversation = (): ChatBotProps => {
    const conversation: ChatBotProps = {
        message: [
            "Olá! Como posso ajudar você hoje?",
            "Qual é a sua dúvida?",
            "Estou aqui para ajudar!",
        ],
        atendente: "Atendente Virtual"
    }
    return conversation;
}