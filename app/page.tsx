import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckSquare, Users, Filter, Calendar } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Collaborative Task Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your team's workflow with our intuitive task management
            system. Create, organize, and track tasks with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-blue-600" />
                Task Management
              </CardTitle>
              <CardDescription>
                Create, update, and organize tasks with our intuitive board
                interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Kanban-style board layout</li>
                <li>• Drag & drop functionality</li>
                <li>• Priority and status management</li>
                <li>• Due date tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Team Collaboration
              </CardTitle>
              <CardDescription>
                Assign tasks and collaborate with your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Task assignment system</li>
                <li>• Real-time updates</li>
                <li>• Team member management</li>
                <li>• Progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-purple-600" />
                Advanced Filtering
              </CardTitle>
              <CardDescription>
                Find tasks quickly with powerful filtering and search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Filter by status and priority</li>
                <li>• Search by task title</li>
                <li>• Sort by due date</li>
                <li>• Custom filter combinations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Recipe Collection
              </CardTitle>
              <CardDescription>
                Browse and search through recipe collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Browse recipe database</li>
                <li>• Search by recipe name</li>
                <li>• View ingredients and instructions</li>
                <li>• Responsive table layout</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/tasks">Get Started with Tasks</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI
          </p>
        </div>
      </div>
    </div>
  );
}
