import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import CodeExample from './CodeExample';
import { colors } from 'styles';

const ExampleWrapper = styled.div`
  border: 1px solid #E6ECF0;
  padding: 20px;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ExampleComponentWrapper = styled.div`
  width: 100%;
  margin-bottom: 45px;
`

const ShowCodeLink = styled.a`
  border: 1px solid #E6ECF0;
  border-radius: 1px;
  color: ${colors.green};
  padding: 5px;
  text-decoration: none;
  width: 100px;
  text-align: center;
`;


class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
  }

  toggleCode = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {showCode: !prevState.showCode};
    });
  }

  render() {
    const {showCode} = this.state;
    const {code, description, name} = this.props.example;
    // Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
    const ExampleComponent = require(`./examples/${this.props.componentName}/${name}`).default;
    return (
      <ExampleWrapper>
        {description && <h4>{description}</h4> }

        <ExampleComponentWrapper>
          <ExampleComponent />
        </ExampleComponentWrapper>

        <ShowCodeLink href="" onClick={this.toggleCode}>
          {showCode ? "Hide" : "Show"} Code
        </ShowCodeLink>

        {showCode && <CodeExample>{code}</CodeExample>}
      </ExampleWrapper>
    )
  }
}

Example.propTypes = {
  example: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired
}

export default Example;