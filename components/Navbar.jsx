
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import Logout from "./auth/Logout"

const Navbar = async ({sidebar}) => {
  const session = await auth()
  return (
    <nav>
    <Link href="/">
      <Image 
        src="/logo.png" 
        alt="Stay Swift Logo" 
        width={50}
        height={100} />
    </Link>

    {
      sidebar && (
        <ul>
      <li>
        <Link href="#">Recommended Places</Link>
      </li>

      <li>
        <Link href="#">About Us</Link>
      </li>

      <li>
        <Link href="#">Contact us</Link>
      </li>

      <li>
        <Link href="/bookings">Bookings</Link>
      </li>

      <li>
        {
          session?.user ? (
            <div>
              <span className="mx-1">{session?.user?.name}</span>
              <span className="mx-1">|</span>
              <Logout/>

            </div>
          ):(<Link href="/login" className="login">Login</Link>)
        }
      </li>
    </ul>
      )
    }
  </nav>
  )
}

export default Navbar