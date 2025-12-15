
import { Metadata } from 'next'
import { getInstagramConfig } from './actions'
import { InstagramSettingsForm } from './instagram-settings-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Automatyzacja Instagrama - Admin',
}

export default async function InstagramAdminPage() {
  const config = await getInstagramConfig()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Automatyzacja Instagrama</h1>
        <div className="flex gap-2">
            <Link href="/admin/instagram">
               <Button variant="secondary">Ustawienia</Button>
            </Link>
            <Link href="/admin/instagram/rules">
               <Button variant="outline">Reguły (Słowa kluczowe)</Button>
            </Link>
            <Link href="/admin/instagram/logs">
                <Button variant="outline">Logi Aktywności</Button>
            </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
         <InstagramSettingsForm initialConfig={config || {}} />
      </div>
    </div>
  )
}
