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

exports.up = function (knex, Promise) {
  return knex.schema.table('dfsps', function (table) {
    table.renameColumn('identifier', 'dfsp_id');
    table.unique(['env_id', 'dfsp_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('dfsps', function (table) {
    table.dropUnique(['env_id', 'dfsp_id']);
    table.renameColumn('dfsp_id', 'identifier');
  });
};
