import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { Moon, Sun, Laptop, Shield, Key, LogOut } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    groupMessages: true,
    resourceUpdates: true,
    newMembers: false,
  })
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "all",
    showEmail: false,
    showActivity: true,
  })

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const handleSaveSettings = async (type) => {
    setIsLoading(true)

    try {
      // Simulate API call (replace with real API call in production)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: `Your ${type} settings have been saved successfully.`,
      })
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationChange("emailNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="sessionReminders" className="font-medium">
                      Session Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Get reminders for upcoming study sessions</p>
                  </div>
                  <Switch
                    id="sessionReminders"
                    checked={notificationSettings.sessionReminders}
                    onCheckedChange={() => handleNotificationChange("sessionReminders")}
                  />
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="groupMessages" className="font-medium">
                      Group Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">Notifications for new messages in your groups</p>
                  </div>
                  <Switch
                    id="groupMessages"
                    checked={notificationSettings.groupMessages}
                    onCheckedChange={() => handleNotificationChange("groupMessages")}
                  />
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="resourceUpdates" className="font-medium">
                      Resource Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Notifications when new resources are shared</p>
                  </div>
                  <Switch
                    id="resourceUpdates"
                    checked={notificationSettings.resourceUpdates}
                    onCheckedChange={() => handleNotificationChange("resourceUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="newMembers" className="font-medium">
                      New Members
                    </Label>
                    <p className="text-sm text-muted-foreground">Notifications when new members join your groups</p>
                  </div>
                  <Switch
                    id="newMembers"
                    checked={notificationSettings.newMembers}
                    onCheckedChange={() => handleNotificationChange("newMembers")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("notification")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how Study Buddy looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">Select your preferred theme</p>
                  <RadioGroup defaultValue="light" onValueChange={() => {}} className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sun className="mb-3 h-6 w-6" />
                        Light
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        Dark
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Laptop className="mb-3 h-6 w-6" />
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility" className="font-medium">
                    Profile Visibility
                  </Label>
                  <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger id="profileVisibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Everyone</SelectItem>
                      <SelectItem value="groups">Group Members Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="showEmail" className="font-medium">
                      Show Email Address
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                  </div>
                  <Switch
                    id="showEmail"
                    checked={privacySettings.showEmail}
                    onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <Label htmlFor="showActivity" className="font-medium">
                      Show Activity Status
                    </Label>
                    <p className="text-sm text-muted-foreground">Show when you're active on Study Buddy</p>
                  </div>
                  <Switch
                    id="showActivity"
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("privacy")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="font-medium">
                    Change Password
                  </Label>
                  <div className="space-y-2">
                    <Input id="currentPassword" type="password" placeholder="Current password" />
                    <Input id="newPassword" type="password" placeholder="New password" />
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="mt-2" variant="outline" size="sm">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium flex items-center mb-2">
                    <Shield className="mr-2 h-4 w-4" />
                    Account Security
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your account security settings</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Enable Two-Factor Authentication
                    </Button>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-destructive flex items-center mb-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Permanent actions that cannot be undone</p>
                  <div className="space-y-2">
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      This will permanently delete your account and all associated data
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}