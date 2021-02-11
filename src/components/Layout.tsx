import React from 'react';
import styled from 'styled-components';
import SideNav from './SideNav';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
  border-right: 1px solid #efefef;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  background: #f9f9f9;
  padding: 16px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <SideBar>
        <SideNav />
      </SideBar>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
