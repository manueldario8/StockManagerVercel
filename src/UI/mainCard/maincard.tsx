import './maincard.css';
import { Link } from 'react-router';

type CardData = {
  title: string;
  information: number;
  identifier: string;
};

type InformationCardProps = {
  data: CardData;
};

const MainCard = ({ data }: InformationCardProps) => {
  return (
    <Link to='' className={`card-info-container id-${data.identifier}`}>
        <p className="card-title">{data.title}</p>
        <p className="card-record">{data.information}</p>
    </Link>
  )
}


export default MainCard;