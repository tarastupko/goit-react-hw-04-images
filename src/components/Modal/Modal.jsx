import React, { useEffect } from 'react';
import { ModalContainer, ModalLoader, Overlay, CloseButton } from './Modal.style'; 
import PropTypes from 'prop-types';

export const Modal = ({ largeImgObj, closeModal }) =>
{
   const handleCloseModal = e => {
    if (e.key === 'Escape' || e.currentTarget === e.target) {
      closeModal();
    }
   };
  
  useEffect(() => {
    const handleKeyDown = e => {
      handleCloseModal(e);
    };
    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  }, [])
  
return (
      <Overlay onClick={handleCloseModal}>
        <ModalContainer>
          <CloseButton onClick={closeModal}>X</CloseButton> 
          <img
            src={
              largeImgObj.largeImageURL ||
              'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
            }
            alt={largeImgObj.tags}
          />
          <ModalLoader format={largeImgObj.largeImageURL}/>
          
        </ModalContainer>
      </Overlay>
    );

  }

Modal.propTypes = {
  largeImgObj: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};