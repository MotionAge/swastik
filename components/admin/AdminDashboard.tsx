"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostManager from "./PostManager"
import NoticeManager from "./NoticeManager"
import ContactMessages from "./ContactMessages"
import GalleryManager from "./GalleryManager"
import JobManager from "./JobManager"
import ApplicationManager from "./ApplicationManager"
import GeneralApplicationManager from "./GeneralApplicationManager"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="general-apps">General CVs</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <PostManager />
        </TabsContent>

        <TabsContent value="notices" className="mt-6">
          <NoticeManager />
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <GalleryManager />
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <JobManager />
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <ApplicationManager />
        </TabsContent>

        <TabsContent value="general-apps" className="mt-6">
          <GeneralApplicationManager />
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <ContactMessages />
        </TabsContent>
      </Tabs>
    </div>
  )
}
