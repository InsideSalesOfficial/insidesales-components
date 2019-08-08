import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import NeuralVerify from './index.js';

const Wrapper = styled.div`
  height: 100px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

storiesOf('Components', module)
  .addWithChapters(
    'NeuralVerify',
    {
      info: `
        Usage

        ~~~
        import React from 'react';
        import {NeuralVerify} from 'insidesales-components';
        ~~~
      `,
      chapters: [
        {
          sections: [
            {
              title: 'Example: Normal verified',
              sectionFn: () => (
                  <Wrapper>
                   <NeuralVerify
                    neuralData={
                      {
                        state: 1,
                        detail: {
                          verifiedDate: "2019-08-05 17:28:34",
                          verifiedReason: "recent_positive",
                          verifiedReasonDetail: "2019-08-05 17:28:34",
                        },
                      }
                    }
                    allowOverflow={true}
                    />
                  </Wrapper>
              )
            },
            {
              title: 'Example: Super verified',
              sectionFn: () => (
                <Wrapper>
                  <NeuralVerify
                    neuralData={
                      {
                        state: 1,
                        detail: {
                          verifiedDate: "2019-06-17 12:05:33",
                          verifiedReason: "super_verified",
                          verifiedReasonDetail: "2019-06-17 12:05:33"
                        }
                      }
                    }
                    allowOverflow={true}
                  />
                </Wrapper>
              )
            }
          ],
        }
      ]
    }
  )