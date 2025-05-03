import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/hooks/use-auth"
import { Calendar, Clock, BookOpen, Award, Upload } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    school: user?.school || "",
    major: user?.major || "",
    graduationYear: user?.graduationYear || "",
    interests: user?.interests || "",
    avatar: user?.avatar || "/placeholder.svg",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to update user profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to update profile",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
                  <AvatarImage src={profileData.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <CardDescription className="text-lg">{user?.email}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user?.major && (
                      <Badge variant="outline" className="text-xs">
                        {user.major}
                      </Badge>
                    )}
                    {user?.school && (
                      <Badge variant="outline" className="text-xs">
                        {user.school}
                      </Badge>
                    )}
                    {user?.graduationYear && (
                      <Badge variant="outline" className="text-xs">
                        Class of {user.graduationYear}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {user?.bio && (
                <div>
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{user.bio}</p>
                </div>
              )}

              {user?.interests && (
                <div>
                  <h3 className="font-medium mb-2">Interests</h3>
                  <p className="text-muted-foreground">{user.interests}</p>
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
                      <AvatarImage src={profileData.avatar} alt={user?.name} />
                      <AvatarFallback className="text-2xl">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.getElementById('avatarInput').click()}
                    >
                      Change Avatar
                    </Button>
                    <input
                      id="avatarInput"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        setIsLoading(true);
                        const formData = new FormData();
                        formData.append('avatar', file);

                        try {
                          const response = await fetch('/api/user/avatar', {
                            method: 'POST',
                            body: formData,
                            headers: {
                              Authorization: `Bearer ${user.token}`,
                            },
                          });

                          if (!response.ok) {
                            throw new Error('Failed to upload avatar');
                          }

                          const data = await response.json();
                          if (data.avatarUrl) {
                            setProfileData((prev) => ({ ...prev, avatar: data.avatarUrl }));
                          } else {
                            throw new Error('Avatar URL not returned');
                          }

                          toast({
                            title: 'Avatar updated',
                            description: 'Your avatar has been updated successfully.',
                          });
                        } catch (error) {
                          toast({
                            title: 'Failed to update avatar',
                            description: error.message || 'There was an error updating your avatar. Please try again.',
                            variant: 'destructive',
                          });
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        placeholder="Tell others about yourself"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="school">School/University</Label>
                        <Input
                          id="school"
                          name="school"
                          value={profileData.school}
                          onChange={handleChange}
                          placeholder="Your school or university"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major/Field of Study</Label>
                        <Input
                          id="major"
                          name="major"
                          value={profileData.major}
                          onChange={handleChange}
                          placeholder="Your major or field of study"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input
                          id="graduationYear"
                          name="graduationYear"
                          value={profileData.graduationYear}
                          onChange={handleChange}
                          placeholder="Expected graduation year"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests</Label>
                      <Textarea
                        id="interests"
                        name="interests"
                        value={profileData.interests}
                        onChange={handleChange}
                        placeholder="Your academic interests and subjects"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => document.querySelector('[data-value="overview"]').click()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your accomplishments on Study Buddy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Earned {achievement.date}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}