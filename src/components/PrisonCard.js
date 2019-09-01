import React from 'react'
import { Card } from 'semantic-ui-react'

const PrisonCard = props => {
  return (
    <>
      <Card>
        <Card.Content header={props.name} />
        <Card.Content description={props.address} />
      </Card>
    </>
  )
}

export default PrisonCard