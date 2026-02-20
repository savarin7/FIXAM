import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Public pages
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailsPage from "@/pages/ServiceDetailsPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFound from "@/pages/NotFound";

// Customer pages
import CustomerDashboard from "@/pages/customer/CustomerDashboard";
import NewRequestPage from "@/pages/customer/NewRequestPage";
import CustomerRequestsPage from "@/pages/customer/CustomerRequestsPage";
import LeaveReviewPage from "@/pages/customer/LeaveReviewPage";
import ProfilePage from "@/pages/customer/ProfilePage";

// Artisan pages
import ArtisanDashboard from "@/pages/artisan/ArtisanDashboard";
import ManageServicesPage from "@/pages/artisan/ManageServicesPage";
import ArtisanRequestsPage from "@/pages/artisan/ArtisanRequestsPage";
import ArtisanReviewsPage from "@/pages/artisan/ArtisanReviewsPage";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageUsersPage from "@/pages/admin/ManageUsersPage";
import ManageCategoriesPage from "@/pages/admin/ManageCategoriesPage";
import AdminServicesPage from "@/pages/admin/AdminServicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Customer routes */}
            <Route element={<ProtectedRoute allowedRoles={['customer']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/new-request" element={<NewRequestPage />} />
              <Route path="/customer/requests" element={<CustomerRequestsPage />} />
              <Route path="/customer/review" element={<LeaveReviewPage />} />
              <Route path="/customer/profile" element={<ProfilePage />} />
            </Route>

            {/* Artisan routes */}
            <Route element={<ProtectedRoute allowedRoles={['artisan']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/artisan" element={<ArtisanDashboard />} />
              <Route path="/artisan/services" element={<ManageServicesPage />} />
              <Route path="/artisan/requests" element={<ArtisanRequestsPage />} />
              <Route path="/artisan/reviews" element={<ArtisanReviewsPage />} />
              <Route path="/artisan/profile" element={<ProfilePage />} />
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsersPage />} />
              <Route path="/admin/categories" element={<ManageCategoriesPage />} />
              <Route path="/admin/services" element={<AdminServicesPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
