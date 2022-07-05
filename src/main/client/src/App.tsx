import { ChakraProvider } from '@chakra-ui/react'
import { IndexLayout } from 'components/@layout/IndexLayout'
import { NotFoundPage } from 'components/@pages/NotFoundPage'
import { ProfilePage } from 'components/@pages/ProfilePage'
import { QRList } from 'components/@pages/QRList'
import { QRScan } from 'components/@pages/QRScan'
import { QRScanResult } from 'components/@pages/QRScanResult'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AchievementCategoryList } from './components/@pages/AchievementCategoryList'
import { AchievementCategoryPage } from './components/@pages/AchievementCategoryPage'
import { AchievementPage } from './components/@pages/AchievementPage'
import { ErrorPage } from './components/@pages/ErrorPage'
import { GroupSelectionPage } from './components/@pages/GroupSelectionPage'
import { Home } from './components/@pages/Home'
import './global.css'
import { AuthProvider } from './utils/AuthContext'
import customTheme from './utils/customTheme'
import { ServiceProvider } from './utils/ServiceContext'

export function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <ServiceProvider>
          <AuthProvider>
            <IndexLayout>
              <Routes>
                <Route path="/">
                  {/*Főoldal*/}
                  <Route index element={<Home />} />
                  {/*Profil*/}
                  <Route path="profile">
                    <Route path="edit-group" element={<GroupSelectionPage />} />
                    <Route index element={<ProfilePage />} />
                  </Route>
                  {/*BucketList*/}
                  <Route path="bucketlist">
                    <Route path="cat/:id" element={<AchievementCategoryPage />} />
                    <Route path=":id" element={<AchievementPage />} />
                    <Route index element={<AchievementCategoryList />} />
                  </Route>
                  {/*QR*/}
                  <Route path="qr-scanned" element={<QRScanResult />} />
                  <Route path="qr">
                    <Route index element={<QRList />} />
                    <Route path="scan" element={<QRScan />} />
                  </Route>
                  {/*Error*/}
                  <Route path="error" element={<ErrorPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </IndexLayout>
          </AuthProvider>
        </ServiceProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
