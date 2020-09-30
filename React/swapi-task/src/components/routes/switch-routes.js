import React from 'react';
import { HOME, CHARACTERS, FILMS, PLANETS, MORE_CHARACTER, NOT_FOUND } from './routes-directions';
import { CharacterDetails, Films, NotFound, People, Planets } from './route-components';
import { Route, Switch } from 'react-router-dom';

const SwitchRoutes = () => {
    return (
        <Switch>
            <Route exact path={HOME} />
            <Route exact path={FILMS} component={Films} />
            <Route exact path={CHARACTERS} component={People} />
            <Route exact path={PLANETS} component={Planets} />
            <Route path={MORE_CHARACTER} component={CharacterDetails} />
            <Route exact path={NOT_FOUND} component={NotFound} />
        </Switch>
    )
};

export default SwitchRoutes;