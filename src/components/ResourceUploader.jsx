import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/toast"
import { uploadResource } from "@/api/resources"
import { FileText, Upload, X } from "lucide-react"

export function ResourceUploader({ groupId, open, onOpenChange }) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      })
      return
    }
    if (files.length > 1) {
      toast({
        title: "Only one file allowed",
        description: "Please select only one file to upload at a time.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setProgress(0)

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return 95
          }
          return prev + 5
        })
      }, 200)

      // Prepare correct payload for backend
      const payload = {
        file: files[0],
        title: title || files[0].name,
      }
      if (groupId) {
        payload.groups = [groupId]
      }
      await uploadResource(payload)

      clearInterval(interval)
      setProgress(100)

      toast({
        title: "Resource uploaded",
        description: "Your resource has been uploaded successfully.",
      })

      setTimeout(() => {
        onOpenChange(false)
        setFiles([])
        setTitle("")
        setProgress(0)
      }, 1000)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your resource. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
          <DialogDescription>Share study materials with your group members.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Chapter 5 Notes"
              />
            </div>
            <div className="grid gap-2">
              <Label>Files</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select files"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, Word, PowerPoint, and images up to 10MB</p>
              </div>
            </div>
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
