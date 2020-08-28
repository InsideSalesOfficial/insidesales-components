import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {renderThemeKeyOrDefaultValue, typography, colors} from "../styles";
import TextInput, { TextBox } from '../TextInput';
import _ from 'lodash';

const StyledSearchInput = styled(TextInput)`
  ${TextBox} {
    'background-color: transparent;'
  }
`;

const SearchWrapper = styled.div`
  padding: 0 24px 12px 24px;
  outline: none;
`;

const SearchEmptyText = styled.div`
  padding-top: 12px;
  color: ${props => renderThemeKeyOrDefaultValue({ props, key: 'white60', defaultValue: colors.white60 })};
  ${typography.subhead1}
`;

class Search extends React.Component {
  componentDidUpdate() {

    if (this.props.isFocused) this.element.scrollIntoViewIfNeeded();
    if (this.props.isFocused) this.element.querySelector('input').focus();
  }

  render() {
    return (
      <SearchWrapper
        tabIndex={-1}
        isFocused={this.props.isFocused}
        innerRef={element => this.element = element}
        onClick={this.props.onClick}
      >
        <StyledSearchInput
          tabIndex={-1}
          label="Search"
          name="selectSearch"
          onChange={this.props.onSearch}
          search
        />
        {this.props.empty && (
          <SearchEmptyText>
            No options match that search criteria
          </SearchEmptyText>
        )}
      </SearchWrapper>);
  }
}

Search.defaultProps = {
  isFocused: false,
  onClick: _.noop,
  onSearch: _.noop,
}

Search.propTypes = {
  isFocused: PropTypes.bool,
  onClick: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Search;