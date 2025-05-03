import { Card } from "../components/ui/card"
import { CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  FileText,
  Download,
  FileImage,
  File as FileGeneric,
} from "lucide-react"
import { formatDate } from "../lib/utils"

export function ResourceList({ resources = [] }) {
  if (resources.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No resources yet</h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            Share study materials with your group to enhance collaborative learning.
          </p>
          <Button>Upload Resource</Button>
        </CardContent>
      </Card>
    )
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "ppt":
      case "pptx":
        return <FileText className="h-10 w-10 text-orange-500" />
      case "jpg":
      case "png":
        return <FileText className="h-10 w-10 text-green-500" />
      default:
        return <FileText className="h-10 w-10 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{getFileIcon(resource.type)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium">{resource.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                  <span>Uploaded by {resource.uploadedBy}</span>
                  <span>{formatDate(resource.uploadedAt)}</span>
                  <span>{resource.fileSize}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="flex-shrink-0">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
