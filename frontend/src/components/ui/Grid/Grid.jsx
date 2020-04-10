import React from 'react';
import MaterialGrid from '@material-ui/core/Grid';

const Grid = ({ spacing, ...props}) => {
  if (spacing) {
    return (
      <div style={{ padding: 8 * spacing / 2 }}>
        <MaterialGrid spacing={spacing} {...props} />
      </div>
    );
  }
  return <MaterialGrid {...props} />;
};

export default Grid;
