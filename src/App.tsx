import React, { Suspense } from 'react'; // 1. Import React and Suspense
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/custom/Layout";
import ScrollToTop from "@/components/custom/ScrollToTop";

// 2. Replace static page imports with dynamic React.lazy imports
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Booking = React.lazy(() => import('./pages/Booking'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AdminPage = React.lazy(() => import('./pages/Admin')); // Also code-split the Admin page

const queryClient = new QueryClient();

// A simple component to show while the next page's code is loading
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-background">
    <p className="text-lg text-muted-foreground">Loading...</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* 3. Wrap your Routes with a Suspense component */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/booking" element={<Layout><Booking /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      
      <Sonner
        toastOptions={{
          classNames: {
            toast: 'bg-white text-black border border-gray-200 p-4',
            title: 'text-base',
          },
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;