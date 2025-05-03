import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth"; 
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useToast } from "@/components/ui/toast";
import { useGroup } from "@/hooks/use-group";
import { fetchGroupChat, sendMessage } from "@/api/chat";
import { formatTime } from "@/lib/utils";
import { Send, Paperclip, FileImage, FileText, Download, ChevronDown } from "lucide-react";

export default function GroupChatPage() {
  const getFileIcon = (type) => {
    if (type) {
      const lowerType = type.toLowerCase();
      if (["jpg", "jpeg", "png", "gif"].includes(lowerType)) {
        return <FileImage className="h-4 w-4" />;
      } else if (["pdf", "doc", "docx"].includes(lowerType)) {
        return <FileText className="h-4 w-4" />;
      }
    }
    return <FileText className="h-4 w-4" />; // Default icon
  };

  const { id } = useParams();
  const { group, isLoading: isGroupLoading } = useGroup(id);
  const { user } = useAuth(); // Get logged-in user details
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadChat = async () => {
      try {
        const chatMessages = await fetchGroupChat(id);
        setMessages(chatMessages);
      } catch (error) {
        toast({
          title: "Error loading chat",
          description: "There was a problem loading the chat messages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadChat();
  }, [id, toast]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) return;
    if (isSending) return; // Prevent duplicate submissions
    setIsSending(true);

    try {
      const sentMessage = await sendMessage(id, newMessage, attachments);
      setMessages((prev) => [...prev, { ...sentMessage, userName: user.name, userAvatar: user.avatar }]);
      setNewMessage("");
      setAttachments([]);
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-background z-10 p-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={group?.avatar || ""} alt={group?.name} />
          <AvatarFallback>{group?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-bold">{group?.name} Chat</h1>
        </div>
      </div>

      <Card className="flex flex-col h-full relative">
        <CardContent className="flex-1 p-2 flex flex-col bg-background">
          <ScrollArea className="flex-1 p-2 overflow-y-auto">
            {messages.length > 0 ? (
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.userId === user.id ? "justify-end" : "justify-start"}`}
                  >
                    {message.userId !== user.id && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.userAvatar || ""} alt={message.userName} />
                        <AvatarFallback>{message.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`p-2 rounded-lg max-w-xs text-sm ${
                        message.userId === user.id
                          ? "bg-primary text-white"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      <p>{message.message}</p>
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
                      <div className="text-xs text-muted-foreground mt-1 text-right">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">No messages yet. Be the first to send a message!</p>
              </div>
            )}
          </ScrollArea>

          <Button
            onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="fixed   top-20 right-10 z-20 bg-primary text-white rounded-full p-2 shadow-lg"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>

          <form
            onSubmit={handleSendMessage}
            className="p-2 border-t flex gap-2 bg-background sticky bottom-[4rem] md:bottom-0 z-10"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 w-8"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isSending}
            />
            <Button type="submit" disabled={isSending} className="h-8 w-8">
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
  );
}
