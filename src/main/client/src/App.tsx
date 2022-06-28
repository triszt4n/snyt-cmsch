import { ChakraProvider } from '@chakra-ui/react'
import { IndexLayout } from 'components/@layout/IndexLayout'
import { ProfilePage } from 'components/@pages/ProfilePage'
import { QRList } from 'components/@pages/QRList'
import { QRScan } from 'components/@pages/QRScan'
import { QRScanResult } from 'components/@pages/QRScanResult'
import { RiddleCategoryList } from 'components/@pages/RiddleCategoryList'
import { RiddlePage } from 'components/@pages/RiddlePage'
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
                  <Route path="profil">
                    <Route path="tankor-modositas" element={<GroupSelectionPage />} />
                    <Route index element={<ProfilePage />} />
                  </Route>
                  {/*Riddle*/}
                  <Route path="riddleok">
                    <Route path=":id" element={<RiddlePage />} />
                    <Route index element={<RiddleCategoryList />} />
                  </Route>
                  {/*BucketList*/}
                  <Route path="bucketlist">
                    <Route path="kategoria/:id" element={<AchievementCategoryPage />} />
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
                  <Route path="error">
                    <Route index element={<ErrorPage />} />
                  </Route>
                </Route>
              </Routes>
            </IndexLayout>
          </AuthProvider>
        </ServiceProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
