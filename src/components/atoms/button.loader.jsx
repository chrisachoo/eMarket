import styled, { keyframes } from 'styled-components'
import { CgSpinnerTwo } from 'react-icons/cg'

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 5px;

  cursor: pointer;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const AnimateIcon = styled(CgSpinnerTwo)`
  animation: ${spin} infinite 2s linear;
  display: ${({ isloading }) => (isloading ? 'unset' : 'none')};
`

const Button = ({ btnName, isLoading, isDisable }) => {
  return (
    <>
      <IconButton
        className="mt-4 mb-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
        type='submit'
        disabled={isDisable}
        primary
      >
        <AnimateIcon isloading={isLoading} />
        {isLoading ? "Please wait..." : btnName}
      </IconButton>
    </>
  );
}

export default Button;