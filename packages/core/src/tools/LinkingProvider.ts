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

import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import {createURLParams, mapURLBuilder, TransportType} from './linking.helper';

class LinkingProvider {
  constructor() {}

  async openURL(url: string, error: {title: string; message: string}) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      try {
        await Linking.openURL(url);
      } catch (e) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: 20,
          text1: error.title,
          text2: `${error.message}: ${e.message}.`,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        bottomOffset: 20,
        text1: 'Unsupported external link',
        text2: `Don't know how to open this URL: ${url}.`,
      });
    }
  }

  async openBrowser(url: string) {
    await this.openURL(url, {
      title: 'Could not open the url',
      message: `Error while opening ${url} in the browser`,
    });
  }

  async openCallApp(tel: string) {
    const URL = `tel:${tel}`;
    await this.openURL(URL, {
      title: 'Could not open the call app',
      message: `Error while opening ${tel} in the call app`,
    });
  }

  async openSMSApp(tel: string) {
    const URL = `sms:${tel}`;
    await this.openURL(URL, {
      title: 'Could not open the sms app',
      message: `Error while opening ${tel} in the sms app`,
    });
  }

  /**
   * @param email one or more recipient email addresses (separated by a "," or a ";")
   */
  async openMailApp(
    email: string,
    subject?: string,
    body?: string,
    to?: string,
    cc?: string,
    bcc?: string,
  ) {
    const URL = createURLParams(`mailto:${email}`, [
      {param: 'subject', value: subject},
      {param: 'body', value: body},
      {param: 'to', value: to},
      {param: 'cc', value: cc},
      {param: 'bcc', value: bcc},
    ]);
    await this.openURL(URL, {
      title: 'Could not open the mail app',
      message: `Error while opening ${email} in the mail app`,
    });
  }

  async openMapApp(
    address?: string,
    destination?: string,
    latitude?: number,
    longitude?: number,
    transportType: string = TransportType.DRIVING,
  ) {
    const URL = mapURLBuilder(
      address,
      destination,
      latitude,
      longitude,
      transportType,
    );
    await this.openURL(URL, {
      title: 'Could not open the map app',
      message: `Error while opening ${address} in the map app`,
    });
  }
}

export const linkingProvider = new LinkingProvider();
