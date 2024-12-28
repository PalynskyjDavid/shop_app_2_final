import React, { useState } from 'react';
import Modal from "react-modal"
import useDetailContext from '../hooks/useDetail';

function AddCartForm({ showModal, handleCloseModal }) {

  const { handlerMap } = useDetailContext();
  const [name, setName] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    //handlerMap.handleCreate(name);
    resetForm();
    handleCloseModal();
    return alert('This function is not implemented yet.');
  };

  const resetForm = () => {
    setName('');
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jméno košíku: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Vytvořit</button>
      </form>
      <button onClick={handleCloseModal}>Zavřít</button>
    </Modal>
  );
};

export default AddCartForm;
