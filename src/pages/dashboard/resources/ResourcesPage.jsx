import React, { useState } from "react"
import { DashboardLayout } from "./components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Badge } from "./components/ui/badge"
import { ResourceUploader } from "./components/resource-uploader"
import { useResources } from "./hooks/use-resources"
import { FileText, FileImage, FileCode, File, Search, Upload, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"

export default function ResourcesPage() {
  const { resources, isLoading } = useResources()
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)

  // Filter resources based on search query
  const filteredResources = searchQuery
    ? resources?.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources

  // Group resources by type
  const documentResources = filteredResources?.filter((r) => ["pdf", "doc", "docx", "txt"].includes(r.type))
  const presentationResources = filteredResources?.filter((r) => ["ppt", "pptx"].includes(r.type))
  const imageResources = filteredResources?.filter((r) => ["jpg", "png", "gif", "svg"].includes(r.type))
  const codeResources = filteredResources?.filter((r) => ["js", "html", "css", "py", "java"].includes(r.type))
  const otherResources = filteredResources?.filter(
    (r) =>
      ![
        "pdf",
        "doc",
        "docx",
        "txt",
        "ppt",
        "pptx",
        "jpg",
        "png",
        "gif",
        "svg",
        "js",
        "html",
        "css",
        "py",
        "java"
      ].includes(r.type)
  )

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Resources</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsUploaderOpen(true)}>
            <Upload className="h-4 w-4 mr-2" /> Upload Resource
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="presentations">Presentations</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading resources...</p>
            </div>
          ) : filteredResources && filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No resources match your search criteria." : "No resources have been shared yet."}
              </p>
              <Button onClick={() => setIsUploaderOpen(true)}>Upload Resource</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading documents...</p>
            </div>
          ) : documentResources && documentResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "No documents match your search criteria."
                  : "No document resources have been shared yet."}
              </p>
              <Button onClick={() => setIsUploaderOpen(true)}>Upload Document</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="presentations" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading presentations...</p>
            </div>
          ) : presentationResources && presentationResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presentationResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No presentations found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "No presentations match your search criteria."
                  : "No presentation resources have been shared yet."}
              </p>
              <Button onClick={() => setIsUploaderOpen(true)}>Upload Presentation</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading images...</p>
            </div>
          ) : imageResources && imageResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No images found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No images match your search criteria." : "No image resources have been shared yet."}
              </p>
              <Button onClick={() => setIsUploaderOpen(true)}>Upload Image</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading code files...</p>
            </div>
          ) : codeResources && codeResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codeResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No code files found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No code files match your search criteria." : "No code resources have been shared yet."}
              </p>
              <Button onClick={() => setIsUploaderOpen(true)}>Upload Code File</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ResourceUploader open={isUploaderOpen} onOpenChange={setIsUploaderOpen} />
    </DashboardLayout>
  )
}

function ResourceCard({ resource }) {
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-muted-foreground" />
      case "ppt":
      case "pptx":
        return <FileImage className="h-8 w-8 text-muted-foreground" />
      case "jpg":
      case "png":
      case "gif":
      case "svg":
        return <FileImage className="h-8 w-8 text-muted-foreground" />
      case "js":
      case "html":
      case "css":
      case "py":
      case "java":
        return <FileCode className="h-8 w-8 text-muted-foreground" />
      default:
        return <File className="h-8 w-8 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{resource.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{resource.uploadedBy}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {getFileIcon(resource.type)}
          <Badge variant="outline" className="mt-2">{resource.type}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
