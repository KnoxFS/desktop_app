import React from 'react';
import { FcApproval, FcFolder, FcShare } from 'react-icons/fc';
import styled from 'styled-components';
import logo from '../res/img/logo-dark.png';
import StorageProgress from './StorageProgress';

interface NavItemType {
  title: string;
  logo: JSX.Element;
}

interface SelectedProps {
  readonly isActive: boolean;
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-top: 24px;
`;

const Logo = styled.img`
  width: 60%;
  align-self: center;
`;

const Nav = styled.div`
  margin-top: 20px;
  flex: 1;
`;

const NavItem = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  cursor: pointer;
  height: 60px;
  align-items: center;

  &:hover {
    background: #dfdfdf;
  }
`;

const NavItemLogo = styled.div`
  margin-right: 8px;
`;

const NavItemTitle = styled.div`
  margin-top: 1px;
`;

const Selected = styled.div<SelectedProps>`
  width: 5px;
  background: ${(props) => (props.isActive ? 'blue' : '')};
  height: 60px;
  margin-right: 15px;
  border-radius: 0px 10px 10px 0px;
`;

const NAV_ITEMS: NavItemType[] = [
  { title: 'My Files', logo: <FcFolder /> },
  { title: 'Shared with me', logo: <FcShare /> },
  { title: 'Account', logo: <FcApproval /> },
];

const SideNav: React.FC = () => {
  const renderNavItem = (item: NavItemType, index: number) => {
    return (
      <NavItem key={index}>
        <Selected isActive={index === 0} />
        <NavItemLogo>{item.logo}</NavItemLogo>
        <NavItemTitle>{item.title}</NavItemTitle>
      </NavItem>
    );
  };

  return (
    <Container>
      <Logo alt="KnoxFS logo" src={logo} />
      <Nav>{NAV_ITEMS.map(renderNavItem)}</Nav>
      <div className="px-4">
        <StorageProgress />
      </div>
    </Container>
  );
};

export default SideNav;
