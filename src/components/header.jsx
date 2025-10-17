import UserData from "./userData";

export default function Header() {

    return(
        <header className="w-full h-[200px] bg-[#15397b] text-white">
            <img src="/logo.png" className="w-[100px]" alt="logo"/>
            <h1>My Shop</h1>
            <UserData/>
        </header>
    )
}