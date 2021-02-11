import React from 'react';

const WarGamesContext = React.createContext();

export const WarGamesProvider = WarGamesContext.Provider;
export const WarGamesConsumer = WarGamesContext.Consumer;

export default WarGamesContext;