import largeLogo from '../../assets/largeLogo.png'
import './Navbar.css'

const NavBar = () => {

  const reloadButton = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className='navBackground'>
        <img className='navLogo' src={largeLogo} alt="" onClick={reloadButton} />
      </div>
      <div className='mobileNavBackground'>
        <img className='mobileNavLogo' src={largeLogo} alt="" onClick={reloadButton} />
      </div>
    </div>
  )
}

export default NavBar