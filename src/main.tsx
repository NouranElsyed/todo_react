import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient(
//   {
//   defaultOptions:{
//     queries:{
//       refetchOnWindowFocus:false,
//     }
//   }
// }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='w-full flex items-center justify-center h-screen'>
        <App />
        <Toaster />
      </div>
    </QueryClientProvider>
  </StrictMode>,
)
