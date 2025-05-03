import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import {DashboardLayout} from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"
import { useToast } from "@/components/ui/toast"
import {useGroup} from "@/hooks/use-group"
import { fetchGroupChat, sendMessage, deleteMessage } from "@/api/chat"
import { formatRelativeTime } from "@/lib/utils"
import { Paperclip, Send, MoreVertical, FileText, FileImage, Download, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function GroupChatPage() {
  const { id } = useParams()
  const { group, isLoading: isGroupLoading } = useGroup(id)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [attachments, setAttachments] = useState([])
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadChat = async () => {
      try {
        const chatMessages = await fetchGroupChat(id)
        setMessages(chatMessages)
      } catch (error) {
        toast({
          title: "Error loading chat",
          description: "There was a problem loading the chat messages. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id) loadChat()
  }, [id, toast])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() && attachments.length === 0) return
    setIsSending(true)

    try {
      const sentMessage = await sendMessage(id, newMessage, attachments)
      setMessages((prev) => [...prev, sentMessage])
      setNewMessage("")
      setAttachments([])
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(id, messageId)
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
      toast({
        title: "Message deleted",
        description: "Your message has been deleted.",
      })
    } catch {
      toast({
        title: "Failed to delete message",
        description: "There was an error deleting your message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments(files)
  }

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (type) => {
    if (["jpg", "jpeg", "png", "gif"].includes(type.toLowerCase())) return <FileImage className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  if (isGroupLoading || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading chat...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={group?.avatar || ""} alt={group?.name} />
          <AvatarFallback>{group?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{group?.name} Chat</h1>
          <p className="text-muted-foreground">{group?.memberCount || 0} members</p>
        </div>
      </div>

      <Card className="flex flex-col h-[calc(100vh-12rem)]">
        <CardHeader className="px-4 py-3 border-b">
          <CardTitle className="text-lg">Group Discussion</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.userAvatar || ""} alt={message.userName} />
                      <AvatarFallback>{message.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.userName}</span>
                          <span className="text-xs text-muted-foreground">{formatRelativeTime(message.timestamp)}</span>
                        </div>
                        {message.userId === "1" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteMessage(message.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                      <p className="text-sm mt-1">{message.message}</p>
                      {message.attachments?.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm"
                            >
                              {getFileIcon(attachment.type)}
                              <span className="flex-1 truncate">{attachment.name}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-muted-foreground">No messages yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to send a message!</p>
                </div>
              </div>
            )}
          </ScrollArea>

          {attachments.length > 0 && (
            <div className="px-4 py-2 border-t">
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm">
                    {getFileIcon(file.name.split(".").pop())}
                    <span className="truncate max-w-[150px]">{file.name}</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleRemoveAttachment(index)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isSending}
            />
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
