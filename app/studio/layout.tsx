
import { checkStudioAccess } from './auth'
import { StudioLogin } from './login-view'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Video, PenTool, Lightbulb, LayoutGrid } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hasAccess = await checkStudioAccess()

  if (!hasAccess) {
    return <StudioLogin />
  }

  return (
    <div className="flex flex-col space-y-6">
       {/* Studio Header / Nav */}
       <div className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-2xl font-bold flex items-center gap-2">
                <LayoutGrid className="w-6 h-6" />
                Content Studio
             </h2>
          </div>
          
          <nav className="flex gap-2">
            <Link href="/studio">
                <Button variant="ghost" className="gap-2 justify-start">
                    <Lightbulb className="w-4 h-4" /> Projekty
                </Button>
            </Link>
            <Link href="/studio/clipper">
                <Button variant="ghost" className="gap-2 justify-start">
                    <Video className="w-4 h-4" /> Video Clipper
                </Button>
            </Link>
            <Link href="/studio/writer">
                <Button variant="ghost" className="gap-2 justify-start">
                    <PenTool className="w-4 h-4" /> AI Writer
                </Button>
            </Link>
          </nav>
       </div>

       <div className="bg-white rounded-lg min-h-[500px] p-6 shadow-sm border">
          {children}
       </div>
    </div>
  )
}
