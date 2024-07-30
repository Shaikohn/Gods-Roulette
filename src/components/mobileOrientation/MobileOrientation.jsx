import { useEffect, useState } from 'react';
import './MobileOrientation.css';
import { FcRotateToLandscape } from "react-icons/fc";
import icon from '../../assets/Logo.png'

const MobileOrientation = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      if(window.innerHeight > window.innerWidth) {
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`orientation-container ${isPortrait ? 'show-message' : ''}`}>
      {isPortrait && (
        <div className="rotate-message">
          <p>Por favor, gira tu dispositivo a horizontal para continuar.</p>
          {/* <FcRotateToLandscape size={100} style={{marginTop: '20px'}} /> */}
          <img src={icon} style={{height: '200px', width: '200px'}} />
          <p>Corroborar que este desactivado el bloqueo de orientación de pantalla</p>
        </div>
      )}
      {!isPortrait && children}
    </div>
  );
};

export default MobileOrientation;