import './dashboard.css';
import { MainCard } from '../../exports';

const mainCards = [
  {
    title: 'Productos totales',
    information: 2750,
    identifier: '1'
  },
  {
    title: 'Pedidos pendientes',
    information: 1024,
    identifier: '2'
  },
  {
    title: 'Categorías',
    information: 541,
    identifier: '3'
  },
  {
    title: 'Ganancias',
    information: 29375180,
    identifier: '4'
  },

]

const Dashboard = () => {
  return (
    <>
    
    <div className="dashboard">
      <h3 className='title-dash'>Dashboard</h3>
      <div className="cards-container">
        <MainCard data={mainCards[0]}></MainCard>
        <MainCard data={mainCards[1]}></MainCard>
        <MainCard data={mainCards[2]}></MainCard>
        <MainCard data={mainCards[3]}></MainCard>
        </div>
    </div>
    </>
  )
}

export default Dashboard;