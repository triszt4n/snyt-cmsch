import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ProfileDTO, RoleType } from 'types/dto/profile'
import { useAuthContext } from 'utils/useAuthContext'
import { Loading } from '../../utils/Loading'
import { LinkButton } from '../@commons/LinkButton'
import { Page } from '../@layout/Page'

const challenges = (profile: ProfileDTO) => [
  {
    name: 'Riddle',
    completed: profile?.completedRiddleCount,
    total: profile?.totalRiddleCount,
    link: '/riddles',
    percentage: profile?.totalRiddleCount === 0 ? 0 : (profile?.completedRiddleCount / profile?.totalRiddleCount) * 100
  },
  {
    name: 'QR kód',
    completed: profile?.collectedTokenCount,
    total: profile?.totalTokenCount,
    link: '/qr',
    percentage: profile?.totalTokenCount === 0 ? 0 : (profile?.collectedTokenCount / profile?.totalTokenCount) * 100
  }
]

type ProfilePageProps = {}

function submittedPercent(profile: ProfileDTO) {
  let res = (profile.submittedAchievementCount / profile.totalAchievementCount) * 100
  return isNaN(res) ? 0 : res
}

function completedPercent(profile: ProfileDTO) {
  let res = (profile.completedAchievementCount / profile.totalAchievementCount) * 100
  return isNaN(res) ? 0 : res
}

//Had to create a separate skeleton layout so it wouldn't look strange
export const ProfilePageSkeleton: React.FC<ProfilePageProps> = (props) => {
  return (
    <Page {...props} loginRequired>
      <VStack align="flex-start" mb="14" mt={6}>
        <Skeleton h={12} w={['40%', null, null, '15%']} />
        <Skeleton h={10} w={['50%', null, null, '20%']} />
        <Skeleton h={10} w={['60%', null, null, '25%']} />
      </VStack>
      <Wrap spacing="3rem" justify="center" mt={3}>
        {[0, 1, 2].map((challenge) => (
          <WrapItem key={challenge}>
            <Center w="10rem" h="12rem">
              <Flex direction="column" align="center">
                <Skeleton mb={3} w="90%" h={10} />
                <SkeletonCircle size="10rem" />
              </Flex>
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Page>
  )
}

export const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const { logout, profile, updateProfile } = useAuthContext()

  React.useEffect(() => {
    updateProfile()
  }, [])

  if (profile === undefined)
    return (
      <Loading>
        <ProfilePageSkeleton {...props} />
      </Loading>
    )

  return (
    <Page {...props} loginRequired>
      <Helmet title="Profil" />
      <Flex justifyContent="space-between" flexDirection={{ base: 'column', sm: 'row' }}>
        <Box>
          <Heading>{profile?.fullName}</Heading>
          <Text fontSize="3xl">Kör: {profile?.groupName || 'nincs'}</Text>
        </Box>
        <VStack py={2} alignItems="flex-end">
          {profile?.role && RoleType[profile.role] >= RoleType.STAFF && (
            <LinkButton colorScheme="brand" href="/admin/control" external>
              Admin panel
            </LinkButton>
          )}
          {profile?.groupSelectionAllowed && (
            <LinkButton colorScheme="brand" href="/profile/edit-group">
              Kör módosítása
            </LinkButton>
          )}
          <Button colorScheme="brand" variant="outline" onClick={logout}>
            Kijelentkezés
          </Button>
        </VStack>
      </Flex>
      {!profile?.groupSelectionAllowed && (
        <Alert status="info" variant="left-accent" mt={5}>
          <AlertIcon />
          Ha a köröd nem helyes, akkor az infópultnál állíttasd át a megfelelőre!
        </Alert>
      )}
      <Flex justify="center" alignItems="center" flexWrap="wrap" mt="10">
        <Center p={3}>
          <Flex direction="column" align="center">
            <Link
              href="/bucketlist"
              fontSize="3xl"
              fontWeight={500}
              _hover={{
                textDecoration: 'none',
                color: useColorModeValue('brand.500', 'brand.600')
              }}
            >
              Bucketlist
            </Link>
            <Box>
              <CircularProgress
                color={useColorModeValue('yellow.400', 'yellow.500')}
                size="10rem"
                position="absolute"
                value={submittedPercent(profile) + completedPercent(profile)}
                trackColor={useColorModeValue('gray.200', 'gray.700')}
              />
              <CircularProgress
                color={useColorModeValue('brand.500', 'brand.600')}
                size="10rem"
                value={completedPercent(profile)}
                trackColor="transparent"
              >
                <CircularProgressLabel
                  color={
                    submittedPercent(profile) + completedPercent(profile) === 0 ? 'gray.500' : useColorModeValue('brand.500', 'brand.600')
                  }
                  pb={submittedPercent(profile) !== 0 ? '2.9rem' : '0'}
                >
                  {Math.round(completedPercent(profile))}%
                </CircularProgressLabel>
                {submittedPercent(profile) !== 0 && (
                  <>
                    <CircularProgressLabel>
                      <Box
                        height="2px"
                        backgroundColor={useColorModeValue('gray.200', 'gray.700')}
                        width="70%"
                        mx="auto"
                        borderRadius="20%"
                      />
                    </CircularProgressLabel>
                    <CircularProgressLabel color={useColorModeValue('yellow.400', 'yellow.500')} pt="2.5rem">
                      {Math.round(submittedPercent(profile))}%
                    </CircularProgressLabel>
                  </>
                )}
              </CircularProgress>
            </Box>
          </Flex>
        </Center>

        {challenges(profile!).map((challenge) => (
          <Center p={3}>
            <Flex direction="column" align="center">
              <Link
                href={challenge.link}
                fontSize="3xl"
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                  color: useColorModeValue('brand.500', 'brand.600')
                }}
              >
                {challenge.name}
              </Link>
              <CircularProgress
                color={useColorModeValue('brand.500', 'brand.600')}
                size="10rem"
                value={challenge.percentage}
                trackColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <CircularProgressLabel color={challenge.completed === 0 ? 'gray.500' : useColorModeValue('brand.500', 'brand.600')}>
                  {Math.round(challenge.percentage)}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Center>
        ))}
      </Flex>
    </Page>
  )
}
