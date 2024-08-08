import { Badge, Card, CardBody, Stack } from 'react-bootstrap';
import { Tag } from '../../tag';
import { Link } from 'react-router-dom';

import styles from './Note-card.module.css';

type NoteCardProps = {
  title: string,
  tags: Tag[],
  id: string
};

const NoteCard = ({title, tags, id}: NoteCardProps) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <CardBody>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'
        >
          <span className='fs-5'>{title}</span>
          {tags.length > 0 && (
            <Stack
              direction='horizontal'
              gap={1}
              className='justify-content-center align-items-center flex-wrap'
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}
export default NoteCard;
