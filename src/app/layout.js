// "use client";

import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: 'Task Manager',
  description: 'Developed by @PranavShilavane - Just Practice app while learning development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen`}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Navbar />
        <div className='min-h-screen w-full'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
