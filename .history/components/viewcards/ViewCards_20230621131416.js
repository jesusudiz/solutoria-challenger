import React from 'react';
import Card from '@components/card/Card.js';

export default function ViewCards ({dataList}) {
    return(
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dataList.map((indicador) => (
        <Card key={data.id}data={indicador} />
      ))}
</div>
    )
}