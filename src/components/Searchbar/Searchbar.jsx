import { useState } from 'react';

import css from './Searchbar.module.css';
import Icon from '@mdi/react';
import { mdiSearchWeb } from '@mdi/js';

const Searchbar = ({ handlySetSearchQuery }) => {
  const [value, setValue] = useState('');

  const handlyChange = ({ target: { value } }) => {
    setValue(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handlySetSearchQuery(value);
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmit} className={css.searchform}>
        <button type="submit" className={css.searchformbutton}>
          <Icon path={mdiSearchWeb} size={1} />
          <span className={css.searchformbuttonlabel}>Search</span>
        </button>

        <input
          className={css.searchforminput}
          type="text"
          onChange={handlyChange}
          placeholder="Search images and photos"
          value={value}
        />
      </form>
    </header>
  );
};

export default Searchbar;
