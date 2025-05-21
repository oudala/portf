import Link from "next/link"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BarChart3,
  CreditCard,
  DollarSign,
  Package,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Download
          </Button>
          <Button size="sm">
            <span className="sr-only sm:not-sr-only sm:inline">Create</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted/25" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Customer {i + 1}</p>
                        <p className="text-sm text-muted-foreground">customer{i + 1}@example.com</p>
                      </div>
                      <div className="ml-auto font-medium">+${(Math.random() * 1000).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You have 12 pending orders.</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Order #{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-sm text-muted-foreground">Status: Processing</p>
                      </div>
                      <div className="font-medium">${(Math.random() * 1000).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/orders" className="text-sm text-primary hover:underline">
                  View all orders
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Your best-selling products this month.</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-4">
                  {["Product A", "Product B", "Product C"].map((product, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{product}</p>
                        <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 1000)} units sold</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className={i % 2 === 0 ? "text-green-500" : "text-red-500"}>
                          {i % 2 === 0 ? "+" : "-"}
                          {Math.floor(Math.random() * 100)}%
                        </span>
                        {i % 2 === 0 ? (
                          <ArrowUpIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/products" className="text-sm text-primary hover:underline">
                  View all products
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Customer activity and demographics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="text-sm font-medium">New Customers</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">+573</div>
                      <div className="flex items-center text-sm text-green-500">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        12%
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-sm font-medium">Active Users</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">2,834</div>
                      <div className="flex items-center text-sm text-green-500">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        7%
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="text-sm font-medium">Conversion Rate</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">3.2%</div>
                      <div className="flex items-center text-sm text-red-500">
                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                        0.3%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">132,234</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.3%</div>
                <p className="text-xs text-muted-foreground">-8.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 12s</div>
                <p className="text-xs text-muted-foreground">+14.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted/25" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Summary of your monthly performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/25" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Report</CardTitle>
                <CardDescription>Summary of your quarterly performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/25" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Annual Report</CardTitle>
                <CardDescription>Summary of your annual performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/25" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
