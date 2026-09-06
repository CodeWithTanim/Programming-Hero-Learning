import './UserCard.css'

export default function UserCard ({user}) {
    return (
        <div className='user'>
            <h3>Name: {user.name}</h3>
            <p>Email: {user.email}</p>
            <p><small>Phone: {user.phone}</small></p>
            
        </div>
    )
}