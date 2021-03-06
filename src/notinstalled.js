/*
 *
 *  CPUPower for GNOME Shell preferences
 *  - Creates a widget to set the preferences of the cpupower extension
 *
 * Copyright (C) 2017
 *     Martin Koppehel <martin.koppehel@st.ovgu.de>,
 *     Fin Christensen <christensen.fin@gmail.com>,
 *
 * This file is part of the gnome-shell extension cpupower.
 *
 * gnome-shell extension cpupower is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * gnome-shell extension cpupower is distributed in the hope that it
 * will be useful, but WITHOUT ANY WARRANTY; without even the
 * implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell extension cpupower.  If not, see
 * <http://www.gnu.org/licenses/>.
 *
 */

// Gnome imports
const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;

// Relative and misc imports and definitions
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.src.convenience;
const CPUFreqBaseIndicator = Me.imports.src.baseindicator.CPUFreqBaseIndicator;
const attempt_installation = Me.imports.src.utils.attempt_installation;

const SETTINGS_ID = 'org.gnome.shell.extensions.cpupower';
const Gettext = imports.gettext.domain('gnome-shell-extension-cpupower');
const _ = Gettext.gettext;

var NotInstalledIndicator = new Lang.Class({
    Name: 'cpupower.CPUFreqNotInstalledIndicator',
    Extends: CPUFreqBaseIndicator,

    _init: function(done)
    {
        this._done = done;
        this.parent();
    },

    _createMenu: function()
    {
        this.parent();
        let notInstalledLabel = new PopupMenu.PopupMenuItem(_('Installation required.'), {reactive: false});
        this.section.addMenuItem(notInstalledLabel);

        let separator = new PopupMenu.PopupSeparatorMenuItem();
        this.section.addMenuItem(separator);

        this.attemptInstallationLabel = new PopupMenu.PopupMenuItem(_('Attempt installation'), {reactive: true});
        this.attemptInstallationLabel.connect('activate', attempt_installation.bind(null, this._done));
        this.section.addMenuItem(this.attemptInstallationLabel);
    },
});
