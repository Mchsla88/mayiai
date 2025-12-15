
import { Metadata } from 'next'
import { getAutomationRules } from '../actions'
import { RulesClient } from './rules-client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Reguły Automatyzacji - Instagram',
}

export default async function InstagramRulesPage() {
  const rules = await getAutomationRules()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reguły Automatyzacji</h1>
        <div className="flex gap-2">
            <Link href="/admin/instagram">
               <Button variant="outline">Ustawienia</Button>
            </Link>
            <Link href="/admin/instagram/rules">
               <Button variant="secondary">Reguły (Słowa kluczowe)</Button>
            </Link>
            <Link href="/admin/instagram/logs">
                <Button variant="outline">Logi Aktywności</Button>
            </Link>
        </div>
      </div>

      <RulesClient rules={rules} />
    </div>
  )
}
