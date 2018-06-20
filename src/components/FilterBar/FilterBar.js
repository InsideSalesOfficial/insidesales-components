import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SelectInput from '../SelectInput';
import Icons from '../icons';
import InteractiveElement from '../InteractiveElement';
import { InputItem } from '../TextInput/TextInput';

import { colors, boxShadows } from '../styles';

const FilterBarWrapper = styled.div`
  background-color: ${colors.darkBlueD};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  box-shadow: ${boxShadows.lvl1};
`;

const SearchBarWrapper = styled(FilterBarWrapper)`
  background-color: ${colors.white};
  padding: 0 21px 0 19px;
`;

const StyledSelectInput = styled(SelectInput)`
  padding-left: 16px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-basis: 30%;
  border-left: 1px ${colors.black20} solid;
  height: 100%;
`;

const StyledInteractiveElement = styled(InteractiveElement)`
  cursor: pointer;
  display: flex;
`;

const StyledInputItem = styled(InputItem)`
  padding-left: 19px;
`;

class FilterBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSearch: false
    };
  }

  showSearch = () => {
    this.setState({
      showSearch: true
    });
  }

  hideSearch = () => {
    this.props.onSearchChange('');
    this.setState({
      showSearch: false
    });
  }

  onSearchChange = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.props.onSearchChange(_.get(e, 'target.value'));
  }

  render() {
    if(this.state.showSearch) {
    return (
        <SearchBarWrapper>
          <Icons.SearchMaterialIcon fill={colors.black60}/>
          <StyledInputItem
            type={'text'}
            onChange={this.onSearchChange}
            placeholder={this.props.searchPlaceholder}
            autoFocus/>
          <StyledInteractiveElement onClick={this.hideSearch}>
            <Icons.CloseIcon fill={colors.black60}/>
          </StyledInteractiveElement>
        </SearchBarWrapper>
      );
    }

    return (
      <FilterBarWrapper>
          <StyledSelectInput
          options={this.props.sortOptions}
          onChange={this.props.onSortOptionChange}
          headerLabel={this.props.sortLabel}
          value={this.props.selectedSortOption}
          theme={{
            background: 'transparent',
            noLeftPadding: true,
            labelColor: colors.white60,
            iconColor: colors.white60,
            inputColor: colors.white80,
            disabledInputColor: colors.white50,
            selectArrowColor: colors.white80,
            inputPaddingRight: 23
          }}/>
          <ButtonsWrapper>
            <StyledInteractiveElement onClick={this.props.onClickFilter}>
              <Icons.FilterIcon fill={colors.white60}/>
            </StyledInteractiveElement>
            <StyledInteractiveElement onClick={this.showSearch}>
              <Icons.SearchMaterialIcon fill={colors.white60}/>
            </StyledInteractiveElement>
          </ButtonsWrapper>
        </FilterBarWrapper>
    );
  }
}

FilterBar.defaultProps = {
  onClickFilter: _.noop,
  onSortOptionChange: _.noop,
  sortOptions: [],
  sortLabel: 'Sort By',
  selectedSortOption: {},
  onSearchChange: _.noop,
  searchPlaceholder: 'Search'
};

FilterBar.propTypes = {
  onClickFilter: PropTypes.func.isRequired,
  onSortOptionChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.array.isRequired,
  sortLabel: PropTypes.string.isRequired,
  selectedSortOption: PropTypes.any,
  onSearchChange: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string
};

export default FilterBar;