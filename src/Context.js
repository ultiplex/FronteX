import React from 'react';

export const Web3Context = React.createContext({ available: false, unlock: false, account: null });
export const IdentitiesContext = React.createContext([]);
