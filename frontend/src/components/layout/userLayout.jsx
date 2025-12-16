import { Outlet } from "react-router-dom"
import Footer from "../common/footer"
import Header from "../common/header"

function UserLayout() {
    return (
        <>
        <div>
            <Header></Header>
            <main>
                <Outlet/>
            </main>
            
            <Footer></Footer>
        </div>
        </>
    )
}

export default UserLayout