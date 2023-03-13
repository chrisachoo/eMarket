import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  margin-top: unset !important;
  background: inherit;
`;
const Icon = styled.div`
  padding: 0 10px;
`;

const PasswordShowHide = ({ field, form }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);

  return (
    <Wrapper className="input input-bordered input-primary w-full">
      <Input className=""
        type={showHidePassword ? "text" : "password"} {...field}
        placeholder="Password"
        autoComplete="new-password"
      />
      <Icon>
        {showHidePassword ? <BiShow onClick={() => changeShowHidePassword(!showHidePassword)} /> : <BiHide onClick={() => changeShowHidePassword(!showHidePassword)} />}
      </Icon>
    </Wrapper>
  )
};

export default PasswordShowHide;
// className="input input-bordered input-primary w-full"