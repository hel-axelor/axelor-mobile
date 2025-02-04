/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useRef} from 'react';
import {Theme, Writing} from '@axelor/aos-mobile-ui';
import {Module} from './Module';
import ContextsProvider from './ContextsProvider';
import ContextedApplication from './ContextedApplication';
import {authModule} from '../auth';

interface ApplicationProps {
  modules: Module[];
  mainMenu?: string;
  additionalsReducers?: any;
  version: string;
  themes?: Theme[];
  defaultTheme?: Theme;
  writingThemes?: Writing[];
  defaultWritingTheme?: Writing;
  showModulesSubtitle: boolean;
}

const Application = ({
  modules: modulesProvided,
  mainMenu,
  additionalsReducers,
  version,
  themes,
  defaultTheme,
  writingThemes,
  defaultWritingTheme,
  showModulesSubtitle = false,
}: ApplicationProps) => {
  const modules: Module[] = useRef([authModule, ...modulesProvided]).current;

  return (
    <ContextsProvider
      modules={modules}
      additionalsReducers={additionalsReducers}
      defaultTheme={defaultTheme}
      themes={themes}
      defaultWritingTheme={defaultWritingTheme}
      writingThemes={writingThemes}>
      <ContextedApplication
        modules={modules}
        mainMenu={mainMenu}
        version={version}
        showModulesSubtitle={showModulesSubtitle}
      />
    </ContextsProvider>
  );
};

export default Application;
