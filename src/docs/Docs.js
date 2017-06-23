import React from 'react';
import styled from 'styled-components';

import { fontWeights } from 'styles';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';
import logo from './img/insidesales-logo.svg';

export default class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({route: window.location.hash.substr(1)})
    })
  }

  render() {
    const {route} = this.state;
    const component = route ? componentData.filter( component => component.name === route)[0] : componentData[0];

    return (
      <DocsWrapper>
        <Header>
          <HeaderGroup>
            <HeaderItem>
              <A href='/'>
                <Logo src={logo} />
                <LogoText>UI Components</LogoText>
              </A>
            </HeaderItem>
          </HeaderGroup>
          <HeaderGroupRight>
            <HeaderItem>
              <A href="https://github.com/austinknight/ui-components">GitHub</A>
            </HeaderItem>
          </HeaderGroupRight>
        </Header>
        <Navigation components={componentData.map(component => component.name)} />
        <ComponentPage component={component} />
      </DocsWrapper>
    )
  }
}

const DocsWrapper = styled.div`
  display: flex;
  padding-top: 64px;
  width: 100%;
`;

const Header = styled.header`
  background: #FFF;
  border-bottom: 1px solid #EEE;
  box-sizing: border-box;
  color: #444;
  height: 64px;
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
`;

const HeaderGroup = styled.div`
  position: absolute;
  right: auto;
  bottom: auto;
  left: 0;
  width: auto;
  height: auto;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 1;
  top: 8px;
`;

const HeaderGroupRight = styled(HeaderGroup)`
  left: auto;
  right: 0;
`;

const HeaderItem = styled.div`
  display: inline-block;
  height: 48px;
  line-height: 48px;
  vertical-align: top;
  position: relative;
`;

const Logo = styled.img`
  display: inline-block;
  height: 48px;
  margin-right: 15px;
  width: auto;
  vertical-align: top;
`

const A = styled.a`
  color: #333;
  cursor: pointer;
  text-decoration: none;
`

const LogoText = styled.span`
  font-weight: ${fontWeights.medium};
`;