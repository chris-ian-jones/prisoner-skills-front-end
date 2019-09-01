import React from 'react'
import { Link } from "react-router-dom"
import { Card, Icon, Image } from 'semantic-ui-react'

const PrisonerCard = props => {
  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>
            <span>{props.gender}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <p>Can Have Work Leave: </p>
            {props.canHaveWorkLeave ? <Icon name='check' /> : <Icon name='x' />}
          </a>
        </Card.Content>
        <Link to={`prisoner/${props.id}`}>
          <button>Skills</button>
        </Link>
      </Card>
    </>
  )
}

export default PrisonerCard