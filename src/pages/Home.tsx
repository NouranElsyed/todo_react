import Button from "../components/ui/Button"

const user = localStorage.getItem('User')
const parsedUser = user? JSON.parse(user):null
const token = parsedUser?.jwt
const logined : boolean = token? true : false
console.log(logined)
console.log(parsedUser)

const Home = () => {
  const handleLogout =()=>{
    localStorage.removeItem("User")
    location.replace('/login')
  }
  return (
    <>
    <header>
      <h3 className="fixed top-5 left-5">{parsedUser.user.username}'s Todo</h3>
      <Button  className="fixed top-5 right-5" onClick={handleLogout}>logout</Button>
    </header>
    <div>Home</div>
    </>
  )
}

export default Home