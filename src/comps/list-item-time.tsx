/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import Tooltip from '@reach/tooltip';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { formatDate } from 'utils/misc';
import { Book } from 'types';

const ListItemTimeframe = ({ listItem }: { listItem: Book }) => {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date';

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{ marginTop: 6 }}>
        <FaRegCalendarAlt css={{ marginTop: -2, marginRight: 5 }} />
        <span>
          {listItem.startDate ? formatDate(listItem.startDate) : null}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  );
};

export { ListItemTimeframe };
