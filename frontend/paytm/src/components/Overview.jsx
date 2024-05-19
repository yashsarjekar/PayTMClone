import { Card } from './Card'
import UsersList from './UsersList'
export const Overview = ({dashboard_data}) => {
    return <>
    <h1 className="text-lg font-bold">Overview</h1>
    <div className='grid md:grid-cols-3 gap-4'>
      <Card 
      title={"Wallet Balance"}
      amount={dashboard_data["balance"]}
      orderCount={13}
      ></Card>
      <Card 
      title={"Total Debited"}
      amount={dashboard_data["total_debited"]}
      orderCount={13}
      ></Card>
      <Card 
      title={"Total Credited"}
      amount={dashboard_data["total_credited"]}
      orderCount={13}
      ></Card>
    </div>
    <div className='pt-20'>
      <UsersList></UsersList>
    </div>
  </> 
}