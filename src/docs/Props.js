import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, fontWeights } from 'styles';

const Props = ({props}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Default</Th>
          <Th>Required</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
      {
        Object.keys(props).map(key => {
          return (
            <Tr key={key}>
              <TdName>{key}</TdName>
              <TdType>{props[key].type.name}</TdType>
              <TdDefault>{props[key].defaultValue && props[key].defaultValue.value}</TdDefault>
              <TdRequired>{props[key].required && "X"}</TdRequired>
              <Td>{props[key].description}</Td>
            </Tr>
          );
        })
      }
      </Tbody>
    </Table>
  )
}

Props.propTypes = {
  props: PropTypes.object.isRequired
};

const Table = styled.table`
  display: block;
  overflow: auto;
  width: 100%;
  word-break: keep-all;
  border-collapse: collapse;
  border-spacing: 0;
`;

const Thead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
`;

const Tr = styled.tr`
  border-top: 1px solid ${colors.lightGray};
  display: table-row;
`;

const Th = styled.th`
  color: ${colors.black30};
  display: table-cell;
  padding: 9px 13px;
  font-weight: ${fontWeights.regular};
  vertical-align: top;
  text-align: left;
`;

const Td = styled.td`
  display: table-cell;
  padding: 9px 13px;
  vertical-align: top;
`;

const TdName = styled(Td)`
  color: #266d90;
`;

const TdType = styled(Td)`
  color: #bf2a5c;
`;

const TdDefault = styled(Td)`
  color: ${colors.black30};
`;

const TdRequired = styled(Td)`
  color: ${colors.green};
  text-align: center;
`;

const Tbody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
`;

export default Props;