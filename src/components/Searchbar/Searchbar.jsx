import React, { Component, useState } from 'react';
import { HeaderSearchbar, Form } from './Searchbar.styled';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export const Searchbar= ({onSubmit }) => {
  const [value, setValue] = useState('');

    const handleChange = ({ target }) => {
    setValue(target.value);
    };
  
  const handleSubmit = e => {
    e.preventDefault();
    if (value === '') {
      Notiflix.Notify.failure('Empty input!');
      return;
    }
    onSubmit(value.trim());
    setValue('');
  };
  return (
      <HeaderSearchbar>
        <Form onSubmit={handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            value={value}
          />
        </Form>
      </HeaderSearchbar>
    );
}

/*


  onSubmit = e => {
    e.preventDefault();
    if (this.state.value === '') return Notiflix.Notify.failure('Empty input!');
    this.props.onSubmit(this.state.value.trim());
    this.setState({ value: '' });
  };


}
*/
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};