import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentMethodsLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cards" disabled>
              <Skeleton className="h-4 w-32" />
            </TabsTrigger>
            <TabsTrigger value="wallets" disabled>
              <Skeleton className="h-4 w-32" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-28" />
                        <Skeleton className="h-9 w-9" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Skeleton className="h-24 w-full rounded-lg" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}