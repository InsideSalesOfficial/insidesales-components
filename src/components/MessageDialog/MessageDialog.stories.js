import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';

import MessageDialog from './MessageDialog';

storiesOf('Components', module)
  .addWithChapters(
    'MessageDialog',
    {
      info: `
        Usage

        ~~~
        import React from 'react';
        import {MessageDialog} from 'insidesales-components';
        ~~~
      `,
      chapters: [
        {
          sections: [
            {
              title: 'Basic Modal',
              sectionFn: () => (
                <MessageDialog
                  dialogTitle={'Account Details Needed'}
                  bodyElement={
                    <div>
                      Your email settings must be complete before you can
                      send email messages from Playbooks extension.
                    </div>
                  }
                  secondaryActionText='Cancel'
                  onSecondaryActionClick={action('click option')}
                  primaryActionText='Save'
                  onPrimaryActionClick={action('click option')}
                  center
                  onStoryBook
                />
              )
            },
          ]
        }
      ]
    }
  );