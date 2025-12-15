
import { Metadata } from 'next'
import { getInstagramLogs } from '../actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: 'Logi Aktywności - Instagram',
}

export default async function InstagramLogsPage() {
  const logs = await getInstagramLogs()

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Logi Aktywności</h1>
        <div className="flex gap-2">
            <Link href="/admin/instagram">
               <Button variant="outline">Ustawienia</Button>
            </Link>
            <Link href="/admin/instagram/rules">
               <Button variant="outline">Reguły (Słowa kluczowe)</Button>
            </Link>
            <Link href="/admin/instagram/logs">
                <Button variant="secondary">Logi Aktywności</Button>
            </Link>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Użytkownik</TableHead>
              <TableHead>Wiadomość usera</TableHead>
              <TableHead>Akcja</TableHead>
              <TableHead>Odpowiedź Systemu</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 && (
                <TableRow>
                     <TableCell colSpan={6} className="text-center py-4">Brak logów</TableCell>
                </TableRow>
            )}
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium whitespace-nowrap">
                   {new Date(log.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={log.userMessage || ''}>
                    {log.userMessage}
                </TableCell>
                <TableCell>
                    <Badge variant={log.actionTaken === 'ERROR' ? 'destructive' : 'outline'}>
                        {log.actionTaken}
                    </Badge>
                </TableCell>
                <TableCell className="max-w-[250px] truncate" title={log.responseContent || ''}>
                    {log.responseContent}
                </TableCell>
                <TableCell>
                    <Badge variant={log.status === 'SUCCESS' ? 'default' : 'destructive'}>
                        {log.status}
                    </Badge>
                    {log.error && <p className="text-xs text-red-500 mt-1">{log.error}</p>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
