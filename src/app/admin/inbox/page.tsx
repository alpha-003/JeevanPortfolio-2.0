'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Message } from '@/lib/definitions';
import { collection, orderBy, query } from 'firebase/firestore';
import { ClientTime } from '@/components/client-time';

export default function AdminInboxPage() {
  const firestore = useFirestore();
  const messagesQuery = useMemoFirebase(() =>
    query(collection(firestore, 'contactMessages'), orderBy('dateReceived', 'desc')),
    [firestore]
  );
  const { data: messages, isLoading } = useCollection<Message>(messagesQuery);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Messages from your site's contact form.</CardDescription>
        </CardHeader>
      </Card>
      {isLoading && <p className="text-center">Loading messages...</p>}
      {messages?.map((message) => (
        <Card key={message.id} className={cn(message.isReplied === false && "border-primary")}>
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
                    {message.isReplied === false && <Badge className="mb-1">New</Badge>}
                    <p className="text-xs text-muted-foreground">
                      <ClientTime date={message.dateReceived} />
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
