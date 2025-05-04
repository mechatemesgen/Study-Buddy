import { useState } from "react"
import { Link } from "react-router-dom" 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, FileImage, FileCode, File, Upload, Download, MoreHorizontal } from "lucide-react"
import { ResourceUploader } from "@/components/ResourceUploader"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { downloadResource, previewResource } from "@/api/resources"
import { useToast } from "@/components/ui/toast"

export function ResourcesSection({ resources = [], isLoading }) {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)
  const { toast } = useToast();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-lg border">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Recent Resources</span>
          <Button size="sm" onClick={() => setIsUploaderOpen(true)} className="mt-2">
            <Upload className="h-4 w-4 mr-1" /> Upload
          </Button>
        </CardTitle>
        <CardDescription>Recently shared study materials and resources</CardDescription>
      </CardHeader>
      <CardContent>
        {resources && resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.slice(0, 6).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources shared yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              No resources shared yet. Upload your first resource to share with your groups.
            </p>
            <Button onClick={() => setIsUploaderOpen(true)} className="mt-4">Upload Resource</Button>
          </div>
        )}
      </CardContent>
      {resources && resources.length > 0 && (
        <CardFooter>
          <Button variant="outline" asChild className="w-full mt-4">
            <Link to="/dashboard/resources">View All Resources</Link>
          </Button>
        </CardFooter>
      )}
      <ResourceUploader open={isUploaderOpen} onOpenChange={setIsUploaderOpen} />
    </Card>
  )
}

function ResourceCard({ resource }) {
  const { toast } = useToast();

  // Helper function to determine real file type from file extension or content type
  const getFileType = (resource) => {
    if (!resource) return '';
    
    // First check if we have a file_type from the backend
    if (resource.file_type) {
      return resource.file_type.toLowerCase();
    }
    
    // Then check if there's a type property
    if (resource.type) {
      return resource.type.toLowerCase();
    }
    
    // Try to extract from file name if available
    if (resource.file_name) {
      const parts = resource.file_name.split('.');
      if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
      }
    }
    
    // Try to extract from title if available
    if (resource.title) {
      const parts = resource.title.split('.');
      if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
      }
    }
    
    return '';
  };

  const getFileIcon = (resource) => {
    const type = getFileType(resource);
    
    // Document types
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(type)) {
      return <FileText className={`h-10 w-10 ${type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`} />;
    }
    
    // Presentation types
    if (['ppt', 'pptx', 'key'].includes(type)) {
      return <FileText className="h-10 w-10 text-orange-500" />;
    }
    
    // Image types
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(type)) {
      return <FileImage className="h-10 w-10 text-green-500" />;
    }
    
    // Code types
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'py', 'java', 'c', 'cpp', 'cs', 'rb', 'php', 'go'].includes(type)) {
      return <FileCode className="h-10 w-10 text-yellow-500" />;
    }
    
    // Default for unknown types
    return <File className="h-10 w-10 text-gray-500" />;
  };

  const handleDownload = async () => {
    try {
      toast({
        title: "Downloading...",
        description: "Your download is starting.",
      });
      
      // Get the file name from the resource if available
      const fileName = resource.file_name || `${resource.title}.${getFileType(resource)}` || `resource-${resource.id}`;
      
      console.log(`Starting download for resource ${resource.id}: ${fileName}`);
      await downloadResource(resource.id);
      
      toast({
        title: "Download complete",
        description: `${fileName} has been downloaded.`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: error.message || "There was an error downloading the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = async () => {
    try {
      await previewResource(resource.id);
    } catch (error) {
      toast({
        title: "Preview failed",
        description: error.message || "There was an error previewing the file. Please try downloading instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        {getFileIcon(resource)}
        <div className="flex-1 min-w-0">
          <Link to={`/dashboard/resources/${resource.id}`} className="font-medium hover:underline truncate block">
            {resource.title}
          </Link>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span className="truncate">{resource.uploadedBy || resource.owner || "Unknown"}</span>
            <span className="mx-1">•</span>
            <span>{resource.uploadedAt || "Recently"}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handlePreview}>Preview</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
              <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
              <DropdownMenuItem disabled>
                {getFileType(resource).toUpperCase() || "FILE"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
