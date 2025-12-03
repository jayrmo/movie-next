import { Button as HeroButton, ButtonProps } from '@heroui/react'

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode
}

export function Button({ children, ...props }: CustomButtonProps) {
  return (
    <HeroButton {...props}>
      {children}
    </HeroButton>
  )
}
