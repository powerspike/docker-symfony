import React from 'react';
import { render } from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const itemOptions = [
    { id: 'cat', text: 'Cat' },
    { id: 'coffee_cup', text: 'Coffee Cup' },
    { id: 'fat_cat', text: 'Big Fat Cat' },
    { id: 'laptop', text: 'My Laptop' },
    { id: 'invalid_item', text: 'Dark Matter' }
];
const shouldShowHeart = true;

render(
    <>
        <RepLogApp
            itemOptions={itemOptions}
            withHeart={shouldShowHeart}
        />
    </>,
    document.getElementById('lift-stuff-app')
);

