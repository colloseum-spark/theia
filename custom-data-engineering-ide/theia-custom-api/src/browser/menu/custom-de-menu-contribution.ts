/********************************************************************************
 * Copyright (C) 2020 TORO Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { Command, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MenuNode, SubMenuOptions } from '@theia/core/lib/common';
import { injectable, interfaces } from 'inversify';

const SampleCommand: Command = {
    id: 'git.scalasparkclone'
};
const SampleCommand2: Command = {
    id: 'git.pysparkclone'
};
const SampleCommand3: Command = {
    id: 'git.sqlsparkclone'
};

@injectable()
export class CustomDeMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        const subMenuPath = [...MAIN_MENU_BAR, 'data-engineering-menu'];
        menus.registerSubmenu(subMenuPath, 'Data Engineering', {
            order: '2' // that should put the menu right next to the File menu
        });

        const subSubMenuPath = [...subMenuPath, 'data-engineering-sub-menu'];
        menus.registerSubmenu(subSubMenuPath, 'Choose Project Type', { order: '2' });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand.id,
            order: '1'
        });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand2.id,
            order: '3'
        });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand3.id,
            order: '4'
        });
        const placeholder = new PlaceholderMenuNode([...subSubMenuPath, 'placeholder'].join('-'), 'Project Types', { order: '0' });
        menus.registerMenuNode(subSubMenuPath, placeholder);
    }

}

/**
 * Special menu node that is not backed by any commands and is always disabled.
 */
export class PlaceholderMenuNode implements MenuNode {

    constructor(readonly id: string, public readonly label: string, protected options?: SubMenuOptions) { }

    get icon(): string | undefined {
        return this.options?.iconClass;
    }

    get sortString(): string {
        return this.options?.order || this.label;
    }

}

export const bindCustomDEMenu = (bind: interfaces.Bind) => {
    // bind(CommandContribution).to(SampleCommandContribution).inSingletonScope();
    bind(MenuContribution).to(CustomDeMenuContribution).inSingletonScope();
};
