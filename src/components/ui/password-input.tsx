import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'

// assets
import eyeOpenIcon from '@/app/assets/images/eye-open.svg'
import eyeCloseIcon from '@/app/assets/images/eye-close.svg'

export interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

export const PasswordInput = ({
  visible,
  setVisible,
  ...props
}: PasswordInputProps) => {
  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        placeholder="enter your password here"
        {...props}
      />
      <div
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-2 top-2"
      >
        {visible ? (
          <Image
            src={eyeOpenIcon}
            alt="Password field visible button"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={eyeCloseIcon}
            alt="Password field visible button"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  )
}
