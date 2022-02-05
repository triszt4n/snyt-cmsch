import React from 'react'
import { Box, Heading, HStack, VStack, Image, Text, Spacer } from '@chakra-ui/react'
import { Organization } from '../../types/Organization'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useColorModeValue } from '@chakra-ui/system'

type CardListItemProps = {
  data: Organization
  link: string
}

export const CardListItem: React.FC<CardListItemProps> = ({ data, link }) => {
  let logoSource
  if (data.logo) {
    logoSource = data.darkLogo ? useColorModeValue(data.logo, data.darkLogo) : data.logo
  } else {
    logoSource = data.darkLogo
  }
  return (
    <Link to={link}>
      <Box
        borderRadius="lg"
        padding={4}
        backgroundColor={useColorModeValue('gray.100', 'gray.700')}
        marginTop={5}
        transition="transform .2s ease-in-out"
        _hover={{ transform: 'translateX(0.5em)' }}
      >
        <HStack spacing={4}>
          {logoSource && (
            <Image src={logoSource} alt={data.name} minW={{ base: 12, sm: 16 }} boxSize={{ base: 12, sm: 16 }} objectFit="contain" />
          )}
          <VStack align="flex-start" overflow="hidden">
            <Heading as="h3" size="md" marginY={0} maxWidth="100%">
              {data.name}
            </Heading>
            {data.shortDescription && (
              <Text isTruncated maxWidth="100%" display={['none', 'block']}>
                {data.shortDescription}
              </Text>
            )}
          </VStack>
          <Spacer />
          <ChevronRightIcon boxSize={{ base: 10, md: 16 }} color="gray.300" />
        </HStack>
      </Box>
    </Link>
  )
}
