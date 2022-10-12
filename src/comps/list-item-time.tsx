/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import Tooltip from '@reach/tooltip';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { formatDate } from 'utils/misc';

const ListItemTimeframe = ({ listItem }: { listItem: any }) => {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date';

  console.log('listItem time frame', listItem);

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{ marginTop: 6 }}>
        <FaRegCalendarAlt css={{ marginTop: -2, marginRight: 5 }} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  );
};

export { ListItemTimeframe };
