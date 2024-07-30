import './MobileModals.css'

const MobileModals = ({children, isOpenModal, closeModal}) => {
    return(
        <section className={`mobileModal ${isOpenModal && 'is-open'}`}>
            <div className='mobileModal-container'>
                {children}
                {/* <button className='modal-close' onClick={closeModal}>CLOSE</button> */}
            </div>
        </section>
    )
}

export default MobileModals;