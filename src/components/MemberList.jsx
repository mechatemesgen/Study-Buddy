import { Card } from "../components/ui/card"
import { CardContent } from "../components/ui/card"
import { Avatar } from "../components/ui/avatar"
import { AvatarFallback } from "../components/ui/avatar"
import { AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Users } from "lucide-react"

export function MemberList({ members = [] }) {
  if (members.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No members yet</h3>
          <p className="text-gray-500 text-center max-w-md">
            Invite others to join your study group.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    {member.role === "admin" && <Badge variant="outline">Admin</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Joined {new Date(member.joinedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
