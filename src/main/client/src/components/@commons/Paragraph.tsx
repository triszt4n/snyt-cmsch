import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'

export const Paragraph: React.FC<TextProps> = ({ children, textAlign, ...props }) => {
  return (
    <Text marginTop={4} {...props} textAlign={textAlign}>
      {children}
    </Text>
  )
}
