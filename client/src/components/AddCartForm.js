import React, { useState } from 'react';
import Modal from "react-modal";
import { useTranslation } from "react-i18next";
import useDetailContext from '../hooks/useDetail';

function AddCartForm({ showModal, handleCloseModal }) {
  const { t } = useTranslation();
  const { handlerMap } = useDetailContext();
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //handlerMap.handleCreate(name);
    resetForm();
    handleCloseModal();
    return alert(t('This function is not implemented yet.'));
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
          <label>{t('cartName')}: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t('create')}</button>
      </form>
      <button onClick={handleCloseModal}>{t('close')}</button>
    </Modal>
  );
};

export default AddCartForm;
