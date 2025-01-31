/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

const soap = require('soap');
const path = require('path');
const ExternalProcessError = require('../errors/ExternalProcessError');
const Constants = require('../constants/Constants');

const URL = Constants.AUTH_2FA.WSO2_MANAGER_SERVICE_URL;
const USER = Constants.AUTH_2FA.WSO2_MANAGER_SERVICE_USER;
const PASS = Constants.AUTH_2FA.WSO2_MANAGER_SERVICE_PASSWORD;

/**
 * Returns a claim of the user, if not find returns null
 */
exports.getUserClaimValue = (userName, claim) => {
  soap.createClient(path.join(__dirname, '/../wsdl/RemoteUserStoreManagerService.wsdl'), (err, client) => {
    if (err) {
      throw new ExternalProcessError('error creating WSDL Client', err);
    }
    client.setSecurity(new soap.BasicAuthSecurity(USER, PASS));
    client.setEndpoint(URL);
    client.getUserClaimValue({ userName, claim }, (err, result) => {
      if (err) {
        throw new ExternalProcessError('error calling getUserClaimValue', err);
      }
      let _result = null;
      if (result.getUserClaimValueResponse) {
        _result = result.getUserClaimValueResponse.return;
      }
      return _result;
    });
  });
};

/**
 * set a claim value to a user
 */
exports.setUserClaimValue = (userName, claim, value) => {
  soap.createClient(path.join(__dirname, '/../wsdl/RemoteUserStoreManagerService.wsdl'), (err, client) => {
    if (err) {
      throw new ExternalProcessError('error creating WSDL Client', err);
    }
    client.setSecurity(new soap.BasicAuthSecurity(USER, PASS));
    client.setEndpoint(URL);
    client.setUserClaimValue({ userName, claimURI: claim, claimValue: value }, (err, result) => {
      if (err) {
        throw new ExternalProcessError('error calling setUserClaimValue', err);
      }
    });
  });
};
