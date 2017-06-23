import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { colors, fontWeights, typography } from 'styles';

const Navigation = ({components}) => {
  return (
    <Sidebar>
      <Nav>
        {
          components.map( name => {
            return (
              <NavItem key={name}>
                <NavLink href={`#${name}`}>{name}</NavLink>
              </NavItem>
            )
          })
        }
      </Nav>
    </Sidebar>
  )
}

Navigation.propTypes = {
  components: PropTypes.array.isRequired
};

const Sidebar = styled.div`
  box-sizing: border-box;
  background: #f8f8f8;
  bottom: 0;
  font-size: ${typography.caption};
  line-height: 20px;
  height: auto;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 64px;
  left: 0;
  width: 260px;
  z-index: 2;

  &::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${rgba(0, 0, 0, 0.07)};
    border-radius: 1em;
    cursor: grab;
  }
  &::-webkit-scrollbar-track {
    background: ${rgba(0, 0, 0, 0.05)};
  }
`;

const Nav = styled.ul`
  margin: 0;
  padding: 30px 30px 0 30px;
`

const NavItem = styled.li`
  text-decoration: none;
  list-style: none;
`;

const NavLink = styled.a`
  color: ${props => props.href === window.location.hash ? colors.green : '#333'};
  text-decoration: none;
  font-weight: ${props => props.href === window.location.hash ? fontWeights.medium : fontWeights.regular};
`;

export default Navigation;