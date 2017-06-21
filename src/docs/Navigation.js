import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Navigator = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 20%;
`;

const NavItem = styled.li`
  text-decoration: none;
`;

const Navigation = ({components}) => {
  return (
    <Navigator>
      {
        components.map( name => {
          return (
            <NavItem key={name}>
              <a href={`#${name}`}>{name}</a>
            </NavItem>
          )
        })
      }
    </Navigator>
  )
}

Navigation.propTypes = {
  components: PropTypes.array.isRequired
};

export default Navigation;