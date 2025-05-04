import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router instead of Next.js
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { createGroup, fetchSubjects } from "@/api/groups";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function CreateGroupDialog({ open, onOpenChange }) {
  const navigate = useNavigate(); // useNavigate for routing in Vite
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    privacy: "public",
  });
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const [subjectMode, setSubjectMode] = useState("select"); // "select" or "new"
  const [newSubject, setNewSubject] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      setIsSubjectsLoading(true);
      fetchSubjects()
        .then((data) => setSubjects(data))
        .catch((error) => {
          console.error("Failed to fetch subjects:", error);
          setSubjects([]);
        })
        .finally(() => setIsSubjectsLoading(false));
      setSubjectMode("select");
      setNewSubject("");
      setFormData((prev) => ({ ...prev, subject: "" }));
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    if (name === "subject") {
      if (value === "__new__") {
        setSubjectMode("new");
        setFormData((prev) => ({ ...prev, subject: "" }));
      } else {
        setSubjectMode("select");
        setFormData((prev) => ({ ...prev, subject: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Frontend validation
    if (!formData.name.trim()) {
      setErrorMsg("Group name is required.");
      setIsLoading(false);
      return;
    }
    if (subjectMode === "new" && !newSubject.trim()) {
      setErrorMsg("Subject name is required.");
      setIsLoading(false);
      return;
    }
    if (subjectMode === "select" && !formData.subject) {
      setErrorMsg("Please select a subject.");
      setIsLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg("Description is required.");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        name: formData.name,
        description: formData.description,
        privacy: formData.privacy
      };
      
      // Handle subject based on mode
      if (subjectMode === "new" && newSubject.trim()) {
        payload.subject_name = newSubject.trim();
      } else if (subjectMode === "select" && formData.subject) {
        if (formData.subject !== "__new__") {
          payload.subject_id = Number(formData.subject);
        }
      }
      
      console.log("Creating group with payload:", payload);
      const newGroup = await createGroup(payload);
      
      toast({
        title: "Group created",
        description: `${formData.name} has been created successfully.`,
      });
      
      onOpenChange(false);
      
      // Navigate to the new group page
      navigate(`/dashboard/groups/${newGroup.id}`);
    } catch (error) {
      console.error("Group creation error:", error);
      setErrorMsg(error.message || "There was an error creating your study group. Please try again.");
      toast({
        title: "Failed to create group",
        description: error.message || "There was an error creating your study group. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Study Group</DialogTitle>
          <DialogDescription>Create a new study group to collaborate with others.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="text-red-500 text-sm mb-2">{errorMsg}</div>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Calculus Study Group"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              {subjectMode === "select" && (
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleSelectChange("subject", value)}
                  disabled={isSubjectsLoading}
                  required
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder={isSubjectsLoading ? "Loading..." : "Select a subject"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={String(subject.id)}>
                        {subject.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="__new__">Other (Add new subject)</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {subjectMode === "new" && (
                <div className="flex gap-2 items-center">
                  <Input
                    id="new-subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Enter new subject name"
                    required
                  />
                  <Button type="button" variant="outline" onClick={() => setSubjectMode("select")}>
                    Back
                  </Button>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="privacy">Privacy</Label>
              <Select
                value={formData.privacy}
                onValueChange={(value) => handleSelectChange("privacy", value)}
                required
              >
                <SelectTrigger id="privacy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the purpose and goals of your study group"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
