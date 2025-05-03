import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/toast"
import { fetchResource, downloadResource, toggleFavorite, shareResource, previewResource } from "@/api/resources"

export default function ResourceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [resource, setResource] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareRecipients, setShareRecipients] = useState("")
  const [shareMessage, setShareMessage] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [previewData, setPreviewData] = useState(null)

  useEffect(() => {
    const loadResource = async () => {
      try {
        const resourceData = await fetchResource(id)
        setResource(resourceData)
      } catch (error) {
        toast({
          title: "Error loading resource",
          description: "There was a problem loading the resource details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadResource()
    }
  }, [id, toast])

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const result = await downloadResource(id)
      if (result.success) {
        // In a real app, this would trigger a file download
        toast({
          title: "Download started",
          description: "Your file is being downloaded.",
        })
        // Update the resource with the new download count
        setResource(result.resource)
      } else {
        toast({
          title: "Download failed",
          description: result.error || "There was an error downloading the file. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleToggleFavorite = async () => {
    try {
      const result = await toggleFavorite(id)
      if (result.success) {
        setResource((prev) => ({ ...prev, isFavorite: result.isFavorite }))
        toast({
          title: result.isFavorite ? "Added to favorites" : "Removed from favorites",
          description: result.isFavorite
            ? "This resource has been added to your favorites."
            : "This resource has been removed from your favorites.",
        })
      } else {
        toast({
          title: "Action failed",
          description: result.error || "There was an error processing your request. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Action failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePreview = async () => {
    try {
      const result = await previewResource(id)
      if (result.success) {
        setPreviewData(result.previewData)
        setIsPreviewOpen(true)
      } else {
        toast({
          title: "Preview failed",
          description: result.error || "There was an error previewing the file. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Preview failed",
        description: "There was an error previewing the file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (!shareRecipients.trim()) {
      toast({
        title: "Recipients required",
        description: "Please enter at least one recipient.",
        variant: "destructive",
      })
      return
    }

    setIsSharing(true)
    try {
      const recipients = shareRecipients.split(",").map((email) => email.trim())
      const result = await shareResource(id, {
        recipients,
        message: shareMessage,
      })
      if (result.success) {
        toast({
          title: "Resource shared",
          description: `Resource shared successfully with ${recipients.join(", ")}`,
        })
      } else {
        toast({
          title: "Share failed",
          description: result.error || "There was an error sharing the resource. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "There was an error sharing the resource. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!resource) {
    return <div>Resource not found.</div>
  }

  return (
    <div>
      <h1>{resource.title}</h1>
      <div>
        <button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download"}
        </button>
        <button onClick={handleToggleFavorite}>
          {resource.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <button onClick={handlePreview}>Preview</button>
        <button onClick={() => setIsShareDialogOpen(true)}>Share</button>
      </div>

      {isPreviewOpen && <div>{previewData}</div>}

      {isShareDialogOpen && (
        <div>
          <h2>Share Resource</h2>
          <input
            type="text"
            value={shareRecipients}
            onChange={(e) => setShareRecipients(e.target.value)}
            placeholder="Enter email addresses"
          />
          <textarea
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="Enter message"
          />
          <button onClick={handleShare} disabled={isSharing}>
            {isSharing ? "Sharing..." : "Share"}
          </button>
          <button onClick={() => setIsShareDialogOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
