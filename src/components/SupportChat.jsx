import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi"

const SupportChat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi! Welcome to Cristal Beauty & Clear. How can I help you today?",
        },
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isOpen])

    const handleSend = async (e) => {
        e.preventDefault()
        const trimmed = input.trim()
        if (!trimmed || loading) return
        setLoading(true)
        setMessages((prev) => [...prev, { sender: "user", text: trimmed }])
        setInput("")

        try {
            const params = new URLSearchParams()
            params.append("query", trimmed)

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/support?${params.toString()}`)
            console.log("Support chat response:", response.data)
            setMessages((prev) => [...prev, { sender: "bot", text: response.data || "Sorry, I couldn't find an answer to that question." },])

        } catch (error) {
            console.error("Support chat error:", error)
            setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong. Please try again." },])

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="mb-4 w-90 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
                    <div className="bg-[#0d3b3b] text-white px-4 py-3 flex items-center justify-between">
                        <h3 className="font-semibold text-sm">Cristal AI Support</h3>
                        <p className="text-xs text-teal-200">Ask about products & skincare</p>
                        <button onClick={() => setIsOpen(false)} className="text-teal-200 hover:text-white transition" aria-label="Close chat">
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === "user" ? "bg-[#1a9e8f] text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-500 border border-gray-200 px-3.5 py-2 rounded-2xl rounded-bl-none text-sm">
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask your question..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#1a9e8f]" />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-[#1a9e8f] hover:bg-[#148275] disabled:opacity-50 text-white p-2.5 rounded-full transition"
                            aria-label="Send message">
                            <FiSend className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            <button onClick={() => setIsOpen((prev) => !prev)}
                className="bg-[#1a9e8f] hover:bg-[#148275] w-14 h-14 rounded-full text-white shadow-lg transition transform hover:scale-105 flex items-center justify-center ml-auto">
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
            </button>
        </div>
    )
}
export default SupportChat