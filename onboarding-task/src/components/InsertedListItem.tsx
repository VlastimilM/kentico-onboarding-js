import React from 'react';
import PropTypes from 'prop-types';

export const InsertedListItem = (props) => {
  return (
    <div>
      <span onClick={props.onEdit}>{props.item.index + 1}. {props.item.text}</span>
    </div>
  );
};

InsertedListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

InsertedListItem.displayName = 'InsertedListItem';
