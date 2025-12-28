import { messages } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function AdminInboxPage() {
  const sortedMessages = [...messages].sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Messages from your site's contact form.</CardDescription>
        </CardHeader>
      </Card>
      {sortedMessages.map((message) => (
        <Card key={message.id} className={cn(!message.read && "border-primary")}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{message.name}</CardTitle>
                    <CardDescription>{message.email}</CardDescription>
                  </div>
                  <div className="text-right">
                    {!message.read && <Badge className="mb-1">New</Badge>}
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.receivedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{message.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
