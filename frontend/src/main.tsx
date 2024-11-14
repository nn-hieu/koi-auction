import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/page/HomePage.tsx'
import LoginForm from './components/LoginForm.tsx'
import App from './App.tsx'
import AboutPage from './components/page/AboutPage.tsx'
import { RegistrationForm } from './components/RegistrationForm.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import AuctionList from './components/AuctionList.tsx'
import AuctionDetail from './components/AuctionDetail.tsx'
import AuctionEvent from './components/AuctionEvent.tsx'
import LotDetail from './components/LotDetail.tsx'
import Staff from './components/Staff.tsx'
import { KoiForm } from './components/KoiForm.tsx'
import { KoiRequest } from './components/KoiRequest.tsx'
import TestCountdown from './components/TestCountdown.tsx'
import BillingList from './components/BillingList.tsx'
import KoiList from './components/KoiList.tsx'
import KoiDetail from './components/KoiDetail.tsx'
import BillingDetail from './components/BillingDetail.tsx'
import TransactionList from './components/TransactionList.tsx'
import Shipping from './components/Shipping.tsx'
import Privacy from './components/Privacy.tsx'
import TermsAndConditions from './components/TermAndConditions.tsx'
import NextEvent from './components/NextEvent.tsx'
import Wallet from './components/Wallet.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import NotFoundPage from './components/page/NotFoundPage.tsx'


const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/auction', element: <AuctionEvent /> },
      { path: '/auction/past', element: <AuctionList /> },
      { path: '/auction/:auctionId', element: <AuctionDetail /> },
      { path: '/auction/:auctionId/:lotId', element: <LotDetail /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/signin', element: <LoginForm /> },
      { path: '/signup', element: <RegistrationForm /> },
      { path: '/koi', element: <PrivateRoute element={<KoiList />} allowedRoles={["BREEDER"]} /> },

      { path: '/billing', element: <BillingList /> },
      { path: '/invoice/:invoiceId', element: <BillingDetail /> },

      { path: '/koi-review', element: <PrivateRoute element={<KoiRequest />} allowedRoles={["STAFF"]} /> },
      { path: '/auction-setup', element: <PrivateRoute element={<NextEvent />} allowedRoles={["STAFF"]} /> },
      { path: '/koi/new', element: <PrivateRoute element={<KoiForm />} allowedRoles={["BREEDER"]} /> },
      { path: '/koi/:koiId', element: <PrivateRoute element={<KoiDetail />} allowedRoles={["STAFF", "BREEDER"]} /> },
      { path: '/transaction', element: <PrivateRoute element={<TransactionList />} allowedRoles={["BIDDER", "BREEDER"]} /> },
      { path: '/shipping', element: <PrivateRoute element={<Shipping />} allowedRoles={["SHIPPER"]} /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <TermsAndConditions /> },
      { path: '/wallet', element: <PrivateRoute element={<Wallet />} allowedRoles={["BIDDER", "BREEDER"]} /> },
      {
        path: '*', element: <NotFoundPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </StrictMode>,
)
