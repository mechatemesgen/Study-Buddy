import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/Switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { Moon, Sun, Laptop, Shield, Key, LogOut } from "lucide-react"
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { logout, updateProfile } from "@/api/auth";

export default function SettingsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    groupMessages: true,
    resourceUpdates: true,
    newMembers: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "all",
    showEmail: false,
    showActivity: true,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { theme, setTheme } = useTheme();

  // Fetch user settings when component mounts
  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsSettingsLoading(true);
        const profileData = await updateProfile();
        
        // Set notification settings from user profile if available
        if (profileData.notification_settings) {
          setNotificationSettings({
            emailNotifications: profileData.notification_settings.email_notifications ?? true,
            sessionReminders: profileData.notification_settings.session_reminders ?? true,
            groupMessages: profileData.notification_settings.group_messages ?? true,
            resourceUpdates: profileData.notification_settings.resource_updates ?? true,
            newMembers: profileData.notification_settings.new_members ?? false,
          });
        }
        
        // Set privacy settings from user profile if available
        if (profileData.privacy_settings) {
          setPrivacySettings({
            profileVisibility: profileData.privacy_settings.profile_visibility ?? "all",
            showEmail: profileData.privacy_settings.show_email ?? false,
            showActivity: profileData.privacy_settings.show_activity ?? true,
          });
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsSettingsLoading(false);
      }
    }
    
    fetchSettings();
  }, []);

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = async (type) => {
    setIsLoading(true);

    try {
      let data = {};
      
      // Prepare the data based on settings type
      if (type === "notification") {
        data = {
          notification_settings: {
            email_notifications: notificationSettings.emailNotifications,
            session_reminders: notificationSettings.sessionReminders,
            group_messages: notificationSettings.groupMessages,
            resource_updates: notificationSettings.resourceUpdates,
            new_members: notificationSettings.newMembers,
          }
        };
      } else if (type === "privacy") {
        data = {
          privacy_settings: {
            profile_visibility: privacySettings.profileVisibility,
            show_email: privacySettings.showEmail,
            show_activity: privacySettings.showActivity,
          }
        };
      }
      
      // Send the updated settings to the API
      await updateProfile(data);

      toast({
        title: "Settings saved",
        description: `Your ${type} settings have been saved successfully.`,
      });
    } catch (error) {
      console.error(`Failed to save ${type} settings:`, error);
      toast({
        title: "Failed to save settings",
        description: error.message || "There was an error saving your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords don't match");
      }
      
      if (passwordData.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      
      // Send password change request to API
      await updateProfile({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      console.error("Password change error:", error);
      toast({
        title: "Failed to change password",
        description: error.message || "There was an error changing your password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
    );
    
    if (confirmed) {
      setIsLoading(true);
      try {
        await updateProfile({ delete_account: true });
        await logout(true);
        window.location.href = "/";
      } catch (error) {
        console.error("Delete account error:", error);
        toast({
          title: "Failed to delete account",
          description: error.message || "There was an error deleting your account. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  };

  if (isSettingsLoading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </DashboardLayout>
    );
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  <form onSubmit={handleChangePassword} className="space-y-2">
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type="password" 
                      placeholder="Current password" 
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                      required
                    />
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type="password" 
                      placeholder="New password" 
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                      required
                    />
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="Confirm new password" 
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                      required
                    />
                    <Button className="mt-2" type="submit" variant="outline" size="sm" disabled={isLoading}>
                      <Key className="mr-2 h-4 w-4" />
                      {isLoading ? "Changing..." : "Change Password"}
                    </Button>
                  </form>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium flex items-center mb-2">
                    <Shield className="mr-2 h-4 w-4" />
                    Account Security
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your account security settings</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" disabled>
                      Enable Two-Factor Authentication
                    </Button>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account (Coming soon)</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-destructive flex items-center mb-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Permanent actions that cannot be undone</p>
                  <div className="space-y-2">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleDeleteAccount}
                      disabled={isLoading}
                    >
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