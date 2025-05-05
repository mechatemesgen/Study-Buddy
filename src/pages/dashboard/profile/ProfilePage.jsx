import React from "react"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/Textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/hooks/use-auth"
import { Calendar, Clock, BookOpen, Award, Upload } from "lucide-react"
import { getProfile, updateProfile } from "@/api/auth"

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    school: "",
    major: "",
    graduationYear: "",
    interests: "",
    avatar: "/placeholder.svg",
  })

  // Fetch user profile data when the component mounts
  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoadingProfile(true);
        const profileData = await getProfile();
        
        // Map backend data to frontend format
        setProfileData({
          name: profileData.full_name || profileData.name || "",
          email: profileData.email || "",
          bio: profileData.bio || "",
          school: profileData.school || "",
          major: profileData.major || "",
          graduationYear: profileData.graduation_year || "",
          interests: profileData.interests || "",
          avatar: profileData.avatar || "/placeholder.svg",
        });
      } catch (error) {
        console.error("Failed to load profile data:", error);
        toast({
          title: "Failed to load profile",
          description: "There was an error loading your profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Format data for backend API
      const updatedData = {
        full_name: profileData.name,
        bio: profileData.bio,
        school: profileData.school,
        major: profileData.major,
        graduation_year: profileData.graduationYear,
        interests: profileData.interests,
      };

      const response = await updateProfile(updatedData);
      
      // Update local user data
      const updatedUser = { ...user, ...updatedData, name: updatedData.full_name };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Failed to update profile",
        description: error.message || "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleAvatarUpload = async (file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    setIsLoading(true);
    
    try {
      // Update the profile with the avatar
      const response = await updateProfile(formData);
      
      // Update the avatar in state and local storage
      setProfileData(prev => ({ ...prev, avatar: response.avatar }));
      
      // Update the user object
      const updatedUser = { ...user, avatar: response.avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        title: "Failed to update avatar",
        description: error.message || "There was an error uploading your avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for profile stats
  const stats = [
    { label: "Study Hours", value: "24", icon: Clock },
    { label: "Sessions Attended", value: "12", icon: Calendar },
    { label: "Groups Joined", value: "3", icon: BookOpen },
    { label: "Resources Shared", value: "8", icon: Upload },
  ]

  // Mock data for achievements
  const achievements = [
    {
      title: "Study Streak",
      description: "Completed 5 study sessions in a row",
      date: "Last week",
      icon: Award,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      title: "Resource Contributor",
      description: "Shared 5+ resources with your groups",
      date: "2 weeks ago",
      icon: Upload,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Group Leader",
      description: "Created your first study group",
      date: "1 month ago",
      icon: BookOpen,
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
  ]

  if (isLoadingProfile) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback className="text-2xl">{profileData.name?.substring(0, 2).toUpperCase() || "?"}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                  <CardDescription className="text-lg">{profileData.email}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.major && (
                      <Badge variant="outline" className="text-xs">
                        {profileData.major}
                      </Badge>
                    )}
                    {profileData.school && (
                      <Badge variant="outline" className="text-xs">
                        {profileData.school}
                      </Badge>
                    )}
                    {profileData.graduationYear && (
                      <Badge variant="outline" className="text-xs">
                        Class of {profileData.graduationYear}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.bio && (
                <div>
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{profileData.bio}</p>
                </div>
              )}

              {profileData.interests && (
                <div>
                  <h3 className="font-medium mb-2">Interests</h3>
                  <p className="text-muted-foreground">{profileData.interests}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-4">Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Icon className="h-8 w-8 text-primary mb-2" />
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.querySelector('[data-value="edit"]').click()}
              >
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback className="text-2xl">{profileData.name?.substring(0, 2).toUpperCase() || "?"}</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.getElementById('avatarInput').click()}
                      disabled={isLoading}
                    >
                      Change Avatar
                    </Button>
                    <input
                      id="avatarInput"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleAvatarUpload(file);
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={profileData.name}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={profileData.email}
                          disabled={true} 
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        placeholder="Tell others about yourself"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="school">School/Institution</Label>
                        <Input 
                          id="school" 
                          name="school"
                          value={profileData.school}
                          onChange={handleChange}
                          placeholder="Where do you study?"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="major">Major/Field of Study</Label>
                        <Input 
                          id="major" 
                          name="major"
                          value={profileData.major}
                          onChange={handleChange}
                          placeholder="What do you study?"
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input 
                          id="graduationYear" 
                          name="graduationYear"
                          value={profileData.graduationYear}
                          onChange={handleChange}
                          placeholder="When will you graduate?"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="interests">Interests</Label>
                      <Textarea 
                        id="interests" 
                        name="interests"
                        value={profileData.interests}
                        onChange={handleChange}
                        placeholder="What subjects are you interested in?"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Track your progress and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`${achievement.color} h-12 w-12 rounded-full flex items-center justify-center shrink-0`}>
                      {React.createElement(achievement.icon, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">Earned {achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}