import React from 'react';
import Card from '@material-ui/core/Card';

const SimpleCard = (props) => {
  return (
      <Card className='card'>
          <h2> {props.bookName}</h2>
          <div>
            <p>{props.genre}</p>
            <p>{props.authorName}</p>
          </div>
      </Card>
  );
}

export default SimpleCard;